import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder } from '@ngneat/reactive-forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';

import { ApiShopsService } from '@dsh/api';
import { MemberRole, ResourceScopeId, RoleId } from '@dsh/api-codegen/organizations';

import { getRolesByGroup } from '../../organization-roles/utils/get-roles-by-group';
import { ShopsRole } from '../types/shops-role';

@Injectable()
export class ShopRolesFormService {
    form = this.createRolesForm();
    memberRoles$: Observable<MemberRole[]>;

    private _memberRoles$ = new BehaviorSubject<MemberRole[]>([]);

    get memberRoles(): MemberRole[] {
        return this.form.value
            .map((v) =>
                v.shopIds.map(
                    (resourceId): MemberRole => ({ roleId: v.id, scope: { id: ResourceScopeId.Shop, resourceId } })
                )
            )
            .flat();
    }

    get availableRoleIds(): RoleId[] {
        return Object.values(RoleId).filter((id) => this.form.value.findIndex((r) => r.id === id) === -1);
    }

    constructor(private shopsService: ApiShopsService, private fb: FormBuilder) {
        this.memberRoles$ = this._memberRoles$.asObservable();
    }

    init(roles: MemberRole[]) {
        this.form.clear();
        this.createRolesForm(roles).controls.forEach((c) => this.form.push(c));
    }

    add(roleId: RoleId) {
        return this.shopsService.shops$.pipe(
            first(),
            map((shops) => {
                this.form.push(
                    this.fb.control({
                        id: roleId,
                        shopIds: roleId === RoleId.Administrator ? shops.map(({ id }) => id) : [],
                    })
                );
                if (roleId === RoleId.Administrator) {
                    this.changedMemberRoles();
                }
            }),
            tap(() => this.changedMemberRoles())
        );
    }

    toggle(roleControl: AbstractControl<ShopsRole>, shopId: string) {
        const shopIds = roleControl.value.shopIds.slice();
        if (roleControl.value.shopIds.includes(shopId)) {
            shopIds.splice(
                shopIds.findIndex((id) => id === shopId),
                1
            );
        } else {
            shopIds.push(shopId);
        }
        roleControl.patchValue({ ...roleControl.value, shopIds });
        this.changedMemberRoles();
    }

    toggleAll(roleControl: AbstractControl<ShopsRole>) {
        return this.shopsService.shops$.pipe(
            first(),
            map((shops) => {
                const shopIds = roleControl.value.shopIds.length < shops.length ? shops.map((s) => s.id) : [];
                roleControl.patchValue({ ...roleControl.value, shopIds });
            }),
            tap(() => this.changedMemberRoles())
        );
    }

    remove(roleControl: AbstractControl<ShopsRole>) {
        this.form.remove(roleControl.value);
        this.changedMemberRoles();
    }

    isIntermediate(roleControl: AbstractControl<ShopsRole>) {
        const { shopIds } = roleControl.value;
        return this.shopsService.shops$.pipe(map((shops) => shopIds?.length && shopIds.length < shops.length));
    }

    private createRolesForm(roles?: MemberRole[]) {
        return this.fb.array<ShopsRole>(
            roles?.length
                ? getRolesByGroup(roles).map((group) => ({
                      id: group.id,
                      shopIds: group.scopes.find((scope) => scope.id === ResourceScopeId.Shop)?.resourcesIds || [],
                  }))
                : []
        );
    }

    private changedMemberRoles() {
        this._memberRoles$.next(this.memberRoles);
    }
}
