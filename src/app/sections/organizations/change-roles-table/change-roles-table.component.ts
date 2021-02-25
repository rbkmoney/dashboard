import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractControl, FormBuilder } from '@ngneat/reactive-forms';
import { take } from 'rxjs/operators';

import { ApiShopsService, OrganizationsService } from '@dsh/api';
import { Shop } from '@dsh/api-codegen/capi';
import { RoleId } from '@dsh/api-codegen/organizations';
import { ErrorService, NotificationService } from '@dsh/app/shared';

@Component({
    selector: 'dsh-change-roles-table',
    templateUrl: 'change-roles-table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeRolesTableComponent {
    rolesForm = this.fb.array<{ id: RoleId; shopIds: string[] }>([]);
    shops$ = this.shopsService.shops$;
    RoleId = RoleId;

    constructor(
        private organizationsService: OrganizationsService,
        private errorService: ErrorService,
        private notificationService: NotificationService,
        private fb: FormBuilder,
        private shopsService: ApiShopsService
    ) {}

    add() {
        this.rolesForm.push(this.fb.control({ id: RoleId.Accountant, shopIds: [] as string[] }));
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
    }

    changeAll(roleControl: AbstractControl<{ id: RoleId; shopIds: string[] }>) {
        this.shopsService.shops$.pipe(take(1)).subscribe((shops) => {
            if (roleControl.value.shopIds.length < shops.length) {
                roleControl.patchValue({ ...roleControl.value, shopIds: shops.map((s) => s.id) });
            } else {
                roleControl.patchValue({ ...roleControl.value, shopIds: [] });
            }
        });
    }
}
