import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Inject,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import isNil from 'lodash-es/isNil';
import { BehaviorSubject, combineLatest, EMPTY, of } from 'rxjs';
import { first, map, switchMap, tap } from 'rxjs/operators';

import { ApiShopsService } from '@dsh/api';
import { MemberRole, ResourceScopeId, RoleId } from '@dsh/api-codegen/organizations';
import { DialogConfig, DIALOG_CONFIG } from '@dsh/app/sections/tokens';
import { sortRoleIds } from '@dsh/app/shared/components/organization-roles/utils/sort-role-ids';
import { PartialReadonly } from '@dsh/type-utils';
import { coerceBoolean } from '@dsh/utils';

import { addDialogsClass } from '../../../../utils/add-dialogs-class';
import { SelectRoleDialogComponent } from './components/select-role-dialog/select-role-dialog.component';
import { SelectRoleDialogResult } from './components/select-role-dialog/types/select-role-dialog-result';
import { SelectRoleDialogData } from './components/select-role-dialog/types/selected-role-dialog-data';
import { ShopRolesFormService } from './services/shop-roles-form-service';

@UntilDestroy()
@Component({
    selector: 'dsh-change-roles-table',
    templateUrl: 'change-roles-table.component.html',
    styleUrls: ['change-roles-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ShopRolesFormService],
})
export class ChangeRolesTableComponent implements OnInit {
    @Input() set roles(roles: PartialReadonly<MemberRole>[]) {
        if (!isNil(roles)) {
            this.roles$.next(roles);
            this.roleIds = Array.from(new Set(roles.map(({ roleId }) => roleId).concat(this.roleIds))).sort(
                sortRoleIds
            );
        }
    }
    get roles(): PartialReadonly<MemberRole>[] {
        return this.roles$.value;
    }

    @Input() @coerceBoolean disableBatchChanges: boolean;
    @Input() @coerceBoolean controlled: boolean;

    @Output() selectedRoles = new EventEmitter<PartialReadonly<MemberRole>[]>();
    @Output() addedRoles = new EventEmitter<PartialReadonly<MemberRole>[]>();
    @Output() removedRoles = new EventEmitter<PartialReadonly<MemberRole>[]>();

    roleIds: RoleId[] = [];
    shops$ = this.shopsService.shops$;
    RoleId = RoleId;

    get availableRoles() {
        return Object.values(RoleId).filter((r) => !this.roleIds.includes(r));
    }

    get isAllowRemoves() {
        return !this.disableBatchChanges || this.hasAdminRole;
    }

    get isAllowAdd() {
        return !!this.availableRoles.length && !this.hasAdminRole;
    }

    private roles$ = new BehaviorSubject<PartialReadonly<MemberRole>[]>([]);

    private get hasAdminRole() {
        return !!this.roles.find((r) => r.id === RoleId.Administrator);
    }

    constructor(
        private shopsService: ApiShopsService,
        private dialog: MatDialog,
        @Inject(DIALOG_CONFIG) private dialogConfig: DialogConfig,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.roles$.pipe(untilDestroyed(this)).subscribe((roles) => this.selectedRoles.emit(roles));
    }

    add() {
        const removeDialogsClass = addDialogsClass(this.dialog.openDialogs, 'dsh-hidden');
        this.dialog
            .open<SelectRoleDialogComponent, SelectRoleDialogData, SelectRoleDialogResult>(SelectRoleDialogComponent, {
                data: { availableRoles: this.availableRoles },
                ...this.dialogConfig.large,
            })
            .afterClosed()
            .pipe(
                tap(() => removeDialogsClass()),
                switchMap((result) => (typeof result === 'object' ? of(result.selectedRoleId) : EMPTY)),
                untilDestroyed(this)
            )
            .subscribe((roleId) => {
                this.roleIds = [...this.roleIds, roleId].sort(sortRoleIds);
                if (roleId === RoleId.Administrator) {
                    this.addRoles([{ roleId: RoleId.Administrator }]);
                }
                this.cdr.detectChanges();
            });
    }

    remove(roleId: RoleId) {
        this.roleIds.splice(
            this.roleIds.findIndex((r) => r === roleId),
            1
        );
        this.roleIds = this.roleIds.slice();
        this.removeRoles(this.roles.filter((r) => r.roleId === roleId));
    }

    toggle(roleId: RoleId, resourceId: string) {
        const role: PartialReadonly<MemberRole> = {
            roleId,
            scope: { id: ResourceScopeId.Shop, resourceId },
        };
        const [foundRole] = this.filterRoles(role);
        if (foundRole) {
            this.removeRoles([foundRole]);
        } else {
            this.addRoles([role]);
        }
    }

    toggleAll(roleId: RoleId) {
        const roles = this.roles.filter((r) => r.roleId === roleId);
        combineLatest([this.shops$, this.checkedAll(roleId)])
            .pipe(first(), untilDestroyed(this))
            .subscribe(([shops, isCheckedAll]) => {
                if (isCheckedAll) {
                    this.removeRoles(roles);
                } else {
                    const newRoles = shops
                        .filter((s) => !roles.find((r) => r.scope?.resourceId === s.id))
                        .map(({ id: resourceId }) => ({
                            roleId,
                            scope: { id: ResourceScopeId.Shop, resourceId },
                        }));
                    this.addRoles(newRoles);
                }
            });
    }

    checked(roleId: RoleId, resourceId: string): boolean {
        return (
            roleId === RoleId.Administrator ||
            !!this.filterRoles({ roleId, scope: { id: ResourceScopeId.Shop, resourceId } })?.length
        );
    }

    checkedAll(roleId: RoleId) {
        return combineLatest([this.shops$, this.roles$]).pipe(
            map(
                ([shops, roles]) =>
                    roleId === RoleId.Administrator || shops.length === roles.filter((r) => r.roleId === roleId).length
            )
        );
    }

    isIntermediate(roleId: RoleId) {
        return combineLatest([this.shops$, this.roles$]).pipe(
            map(([shops, roles]) => {
                if (roleId === RoleId.Administrator) {
                    return false;
                }
                const rolesCount = roles.filter((r) => r.roleId === roleId).length;
                return rolesCount && rolesCount < shops.length;
            }),
            map(Boolean)
        );
    }

    private removeRoles(roles: PartialReadonly<MemberRole>[]) {
        if (roles.length) {
            if (!this.controlled) {
                this.roles = this.roles.filter((r) => !roles.includes(r));
            }
            this.removedRoles.emit(roles);
        }
    }

    private addRoles(roles: PartialReadonly<MemberRole>[]) {
        if (roles.length) {
            if (!this.controlled) {
                this.roles = [...this.roles, ...roles];
            }
            this.addedRoles.emit(roles);
        }
    }

    private filterRoles({ id, roleId, scope }: PartialReadonly<MemberRole>): PartialReadonly<MemberRole>[] {
        return this.roles.filter((r) =>
            id
                ? id === r.id
                : r.roleId === roleId &&
                  (!scope || (r.scope?.id === ResourceScopeId.Shop && r.scope?.resourceId === scope.resourceId))
        );
    }
}
