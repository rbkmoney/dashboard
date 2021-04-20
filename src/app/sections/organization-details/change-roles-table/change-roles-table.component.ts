import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import isNil from 'lodash-es/isNil';
import { BehaviorSubject, combineLatest, EMPTY, Observable, of } from 'rxjs';
import { first, map, switchMap, tap } from 'rxjs/operators';

import { ApiShopsService } from '@dsh/api';
import { MemberRole, ResourceScopeId, RoleId } from '@dsh/api-codegen/organizations';
import { DialogConfig, DIALOG_CONFIG } from '@dsh/app/sections/tokens';
import { sortRoleIds } from '@dsh/app/shared/components/organization-roles/utils/sort-role-ids';
import { PartialReadonly } from '@dsh/type-utils';
import { coerceBoolean } from '@dsh/utils';

import { addDialogsClass } from '../../../../utils/add-dialogs-class';
import { equalRoles } from '../members/components/edit-roles-dialog/utils/equal-roles';
import { SelectRoleDialogComponent } from './components/select-role-dialog/select-role-dialog.component';
import { SelectRoleDialogResult } from './components/select-role-dialog/types/select-role-dialog-result';
import { SelectRoleDialogData } from './components/select-role-dialog/types/selected-role-dialog-data';

@UntilDestroy()
@Component({
    selector: 'dsh-change-roles-table',
    templateUrl: 'change-roles-table.component.html',
    styleUrls: ['change-roles-table.component.scss'],
})
export class ChangeRolesTableComponent implements OnInit {
    @Input() set roles(roles: PartialReadonly<MemberRole>[]) {
        if (!isNil(roles)) {
            this.roles$.next(roles);
            this.addRoleIds(roles.map(({ roleId }) => roleId));
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

    get availableRoles(): RoleId[] {
        return Object.values(RoleId).filter((r) => !this.roleIds.includes(r));
    }

    get isAllowRemoves(): boolean {
        return !this.disableBatchChanges || this.hasAdminRole;
    }

    get isAllowAdd(): boolean {
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

    ngOnInit(): void {
        this.roles$.pipe(untilDestroyed(this)).subscribe((roles) => this.selectedRoles.emit(roles));
    }

    add(): void {
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
                this.addRoleIds([roleId]);
                if (roleId === RoleId.Administrator) {
                    this.addRoles([{ roleId: RoleId.Administrator }]);
                }
                this.cdr.detectChanges();
            });
    }

    remove(roleId: RoleId): void {
        this.removeRoleIds([roleId]);
        this.removeRoles(this.roles.filter((r) => r.roleId === roleId));
    }

    toggle(roleId: RoleId, resourceId: string): void {
        const role: PartialReadonly<MemberRole> = {
            roleId,
            scope: { id: ResourceScopeId.Shop, resourceId },
        };
        const foundRole = this.roles.find((r) => equalRoles(r, role));
        if (foundRole) {
            this.removeRoles([foundRole]);
        } else {
            this.addRoles([role]);
        }
    }

    toggleAll(roleId: RoleId): void {
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

    checked(roleId: RoleId, resourceId: string): Observable<boolean> {
        return this.roles$.pipe(
            map(
                (roles) =>
                    roleId === RoleId.Administrator ||
                    !!roles.find((r) => equalRoles(r, { roleId, scope: { id: ResourceScopeId.Shop, resourceId } }))
            )
        );
    }

    checkedAll(roleId: RoleId): Observable<boolean> {
        return combineLatest([this.shops$, this.roles$]).pipe(
            map(([shops, roles]) => {
                const shopIds = shops.map(({ id }) => id);
                return (
                    roleId === RoleId.Administrator ||
                    shops.length <=
                        roles.filter((r) => r.roleId === roleId && shopIds.includes(r.scope?.resourceId)).length
                );
            })
        );
    }

    isIntermediate(roleId: RoleId): Observable<boolean> {
        return combineLatest([this.shops$, this.roles$]).pipe(
            map(([shops, roles]) => {
                if (roleId === RoleId.Administrator) {
                    return false;
                }
                const shopIds = shops.map(({ id }) => id);
                const rolesCount = roles.filter((r) => r.roleId === roleId && shopIds.includes(r.scope?.resourceId))
                    .length;
                return rolesCount > 0 && rolesCount < shops.length;
            })
        );
    }

    private addRoleIds(roleIds: RoleId[]) {
        this.roleIds = Array.from(new Set([...this.roleIds, ...roleIds])).sort(sortRoleIds);
    }

    private removeRoleIds(roleIds: RoleId[]) {
        this.roleIds = this.roleIds.filter((r) => !roleIds.includes(r));
    }

    private addRoles(roles: PartialReadonly<MemberRole>[]) {
        if (roles.length) {
            if (!this.controlled) {
                this.roles = [...this.roles, ...roles];
            }
            this.addedRoles.emit(roles);
        }
    }

    private removeRoles(roles: PartialReadonly<MemberRole>[]) {
        if (roles.length) {
            if (!this.controlled) {
                this.roles = this.roles.filter((r) => !roles.includes(r));
            }
            this.removedRoles.emit(roles);
        }
    }
}
