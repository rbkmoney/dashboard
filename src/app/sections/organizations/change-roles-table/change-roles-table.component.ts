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
import { EMPTY, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { ApiShopsService } from '@dsh/api';
import { Shop } from '@dsh/api-codegen/capi';
import { MemberRole, RoleId } from '@dsh/api-codegen/organizations';
import { DialogConfig, DIALOG_CONFIG } from '@dsh/app/sections/tokens';

import { addDialogsClass } from '../../../../utils/add-dialogs-class';
import { SelectRoleDialogComponent } from './components/select-role-dialog/select-role-dialog.component';
import { SelectRoleDialogResult } from './components/select-role-dialog/types/select-role-dialog-result';
import { SelectRoleDialogData } from './components/select-role-dialog/types/selected-role-dialog-data';
import { ShopRolesFormService } from './services/shop-roles-form-service';
import { ShopsRole } from './types/shops-role';

@UntilDestroy()
@Component({
    selector: 'dsh-change-roles-table',
    templateUrl: 'change-roles-table.component.html',
    styleUrls: ['change-roles-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ShopRolesFormService],
})
export class ChangeRolesTableComponent {
    @Input() set roles(roles: MemberRole[]) {
        if (!isNil(roles)) {
            this.shopRolesFormService.init(roles);
        }
    }
    @Output() selectedRoles = new EventEmitter<MemberRole[]>();

    get availableRoles() {
        return this.shopRolesFormService.availableRoleIds;
    }

    rolesForm = this.shopRolesFormService.form;
    shops$ = this.shopsService.shops$;
    RoleId = RoleId;

    constructor(
        private fb: FormBuilder,
        private shopsService: ApiShopsService,
        private dialog: MatDialog,
        @Inject(DIALOG_CONFIG) private dialogConfig: DialogConfig,
        private cdr: ChangeDetectorRef,
        private shopRolesFormService: ShopRolesFormService
    ) {}

    onInit() {
        this.shopRolesFormService.memberRoles$
            .pipe(untilDestroyed(this))
            .subscribe((roles) => this.selectedRoles.next(roles));
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
                switchMap((selectedRoleId) => this.shopRolesFormService.add(selectedRoleId)),
                untilDestroyed(this)
            )
            .subscribe(() => this.cdr.detectChanges());
    }

    toggle(roleControl: AbstractControl<ShopsRole>, shop: Shop) {
        this.shopRolesFormService.toggle(roleControl, shop.id);
    }

    toggleAll(roleControl: AbstractControl<ShopsRole>) {
        this.shopRolesFormService.toggleAll(roleControl).pipe(untilDestroyed(this)).subscribe();
    }

    remove(roleControl: AbstractControl<ShopsRole>) {
        this.rolesForm.remove(roleControl.value);
    }

    isIntermediate(roleControl: AbstractControl<ShopsRole>) {
        return this.shopRolesFormService.isIntermediate(roleControl);
    }
}
