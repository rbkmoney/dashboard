import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@ngneat/reactive-forms';
import { combineLatest, defer, Observable, Subject } from 'rxjs';
import { first, map, startWith, tap } from 'rxjs/operators';

import { ApiShopsService } from '@dsh/api';
import { MemberRole, ResourceScopeId, RoleId } from '@dsh/api-codegen/organizations';
import { getRolesByGroup } from '@dsh/app/shared/components/organization-roles/utils/get-roles-by-group';
import { ROLE_PRIORITY_DESC } from '@dsh/app/shared/components/organization-roles/utils/role-priority-desc';
import { PartialReadonly } from '@dsh/type-utils';

import { ShopsRole } from '../types/shops-role';

@Injectable()
export class ShopRolesFormService {
    form = this.createRolesForm();
    updatedMemberRoles$ = defer(() => this.updateMemberRoles$.asObservable());

    private updateMemberRoles$ = new Subject<PartialReadonly<MemberRole>[]>();

    get memberRoles(): PartialReadonly<MemberRole>[] {
        return this.form.value
            .map(({ id, shopIds }) =>
                id === RoleId.Administrator
                    ? { roleId: id }
                    : shopIds.map((resourceId) => ({ roleId: id, scope: { id: ResourceScopeId.Shop, resourceId } }))
            )
            .flat();
    }

    get availableRoleIds(): RoleId[] {
        return Object.values(RoleId)
            .filter((id) => this.form.value.findIndex((r) => r.id === id) === -1)
            .filter((id) => (this.form.value.length ? id !== RoleId.Administrator : true));
    }

    constructor(private shopsService: ApiShopsService, private fb: FormBuilder) {}

    init(roles: MemberRole[]): void {
        this.form.clear();
        this.createRolesForm(roles).controls.forEach((control) => this.form.push(control));
    }

    add(roleId: RoleId): void {
        this.form.push(
            this.fb.control({
                id: roleId,
                shopIds: [],
            })
        );
        this.form.setValue(this.form.value.sort((a, b) => ROLE_PRIORITY_DESC[a.id] - ROLE_PRIORITY_DESC[b.id]));
        if (roleId === RoleId.Administrator) {
            this.updateMemberRoles();
        }
    }

    toggle(roleControl: FormControl<ShopsRole>, shopId: string): void {
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
        this.updateMemberRoles();
    }

    toggleAll(roleControl: FormControl<ShopsRole>): Observable<void> {
        return this.shopsService.shops$.pipe(
            first(),
            map((shops) => {
                const shopIds = roleControl.value.shopIds.length < shops.length ? shops.map((s) => s.id) : [];
                roleControl.patchValue({ ...roleControl.value, shopIds });
            }),
            tap(() => this.updateMemberRoles())
        );
    }

    remove(roleControl: FormControl<ShopsRole>): void {
        this.form.remove(roleControl.value);
        this.updateMemberRoles();
    }

    isIntermediate(roleControl: FormControl<ShopsRole>): Observable<boolean> {
        return combineLatest([
            roleControl.valueChanges.pipe(startWith(roleControl.value)),
            this.shopsService.shops$,
        ]).pipe(
            map(
                ([{ id, shopIds }, shops]) =>
                    id !== RoleId.Administrator && !!shopIds?.length && shopIds.length < shops.length
            )
        );
    }

    private createRolesForm(roles?: MemberRole[]): FormArray<ShopsRole> {
        return this.fb.array<ShopsRole>(
            roles?.length
                ? getRolesByGroup(roles).map(({ id, scopes }) => ({
                      id,
                      shopIds: scopes.find((scope) => scope.id === ResourceScopeId.Shop)?.resourcesIds || [],
                  }))
                : []
        );
    }

    private updateMemberRoles(): void {
        this.updateMemberRoles$.next(this.memberRoles);
    }
}
