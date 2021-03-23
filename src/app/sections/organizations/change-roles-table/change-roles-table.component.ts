import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Inject,
    Input,
    Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AbstractControl, FormBuilder } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import isNil from 'lodash-es/isNil';
import { map, take, withLatestFrom } from 'rxjs/operators';

import { ApiShopsService } from '@dsh/api';
import { Shop } from '@dsh/api-codegen/capi';
import { MemberRole, ResourceScopeId, RoleId } from '@dsh/api-codegen/organizations';
import { DialogConfig, DIALOG_CONFIG } from '@dsh/app/sections/tokens';

import { getRolesByGroup } from '../organization-roles/utils/get-roles-by-group';
import { SelectRoleDialogComponent } from './components/select-role-dialog/select-role-dialog.component';
import { SelectRoleDialogResult } from './components/select-role-dialog/types/select-role-dialog-result';
import { SelectRoleDialogData } from './components/select-role-dialog/types/selected-role-dialog-data';

@UntilDestroy()
@Component({
    selector: 'dsh-change-roles-table',
    templateUrl: 'change-roles-table.component.html',
    styleUrls: ['change-roles-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeRolesTableComponent {
    @Input() set roles(roles: MemberRole[]) {
        if (!isNil(roles)) {
            this.rolesForm.clear();
            this.createRolesForm(roles).controls.forEach((c) => this.rolesForm.push(c));
        }
    }
    @Output() selectedRoles = new EventEmitter<MemberRole[]>();

    get availableRoles() {
        return Object.values(RoleId).filter((id) => this.rolesForm.value.findIndex((r) => r.id === id) === -1);
    }

    rolesForm = this.createRolesForm();
    shops$ = this.shopsService.shops$;
    RoleId = RoleId;

    constructor(
        private fb: FormBuilder,
        private shopsService: ApiShopsService,
        private dialog: MatDialog,
        @Inject(DIALOG_CONFIG) private dialogConfig: DialogConfig,
        private cdr: ChangeDetectorRef
    ) {}

    add() {
        this.dialog.openDialogs.forEach((d) => d.addPanelClass('dsh-hidden'));
        this.dialog
            .open<SelectRoleDialogComponent, SelectRoleDialogData, SelectRoleDialogResult>(SelectRoleDialogComponent, {
                data: {
                    availableRoles: this.availableRoles,
                },
                ...this.dialogConfig.large,
            })
            .afterClosed()
            .pipe(withLatestFrom(this.shops$), untilDestroyed(this))
            .subscribe(([result, shops]) => {
                this.dialog.openDialogs.forEach((d) => d.removePanelClass('dsh-hidden'));
                if (typeof result === 'object') {
                    this.rolesForm.push(
                        this.fb.control({
                            id: result.selectedRoleId,
                            shopIds: result.selectedRoleId === RoleId.Administrator ? shops.map(({ id }) => id) : [],
                        })
                    );
                    if (result.selectedRoleId === RoleId.Administrator) {
                        this.emitSelectedRoles();
                    }
                    this.cdr.detectChanges();
                }
            });
    }

    change(roleControl: AbstractControl<{ id: RoleId; shopIds: string[] }>, shop: Shop) {
        const shopIds = roleControl.value.shopIds.slice();
        if (roleControl.value.shopIds.includes(shop.id)) {
            shopIds.splice(
                shopIds.findIndex((id) => id === shop.id),
                1
            );
        } else {
            shopIds.push(shop.id);
        }
        roleControl.patchValue({ ...roleControl.value, shopIds });
        this.emitSelectedRoles();
    }

    changeAll(roleControl: AbstractControl<{ id: RoleId; shopIds: string[] }>) {
        this.shopsService.shops$.pipe(take(1)).subscribe((shops) => {
            const shopIds = roleControl.value.shopIds.length < shops.length ? shops.map((s) => s.id) : [];
            roleControl.patchValue({ ...roleControl.value, shopIds });
            this.emitSelectedRoles();
        });
    }

    remove(roleControl: AbstractControl) {
        this.rolesForm.remove(roleControl.value);
        this.emitSelectedRoles();
    }

    isIndeterminateShops(shopIds: string[]) {
        return this.shops$.pipe(map((shops) => !!shopIds?.length && shopIds.length < shops.length));
    }

    private createRolesForm(roles?: MemberRole[]) {
        return this.fb.array<{ id: RoleId; shopIds: string[] }>(
            roles?.length
                ? getRolesByGroup(roles).map((group) => ({
                      id: group.id,
                      shopIds: group.scopes.find((scope) => scope.id === ResourceScopeId.Shop)?.resourcesIds || [],
                  }))
                : []
        );
    }

    private emitSelectedRoles() {
        const memberRoles: MemberRole[] = this.rolesForm.value
            .map((v) =>
                v.shopIds.map(
                    (resourceId): MemberRole => ({ roleId: v.id, scope: { id: ResourceScopeId.Shop, resourceId } })
                )
            )
            .flat();
        this.selectedRoles.emit(memberRoles);
    }
}
