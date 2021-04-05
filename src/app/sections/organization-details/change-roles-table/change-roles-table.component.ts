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
import { FormControl } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import isNil from 'lodash-es/isNil';
import { EMPTY, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { ApiShopsService } from '@dsh/api';
import { Shop } from '@dsh/api-codegen/capi';
import { MemberRole, RoleId } from '@dsh/api-codegen/organizations';
import { DialogConfig, DIALOG_CONFIG } from '@dsh/app/sections/tokens';
import { PartialReadonly } from '@dsh/type-utils';
import { coerceBoolean } from '@dsh/utils';

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
export class ChangeRolesTableComponent implements OnInit {
    @Input() set roles(roles: MemberRole[]) {
        if (!isNil(roles)) {
            this.shopRolesFormService.init(roles);
        }
    }
    @Input() @coerceBoolean disableBatchChanges: boolean;

    @Output() selectedRoles = new EventEmitter<PartialReadonly<MemberRole>[]>();

    get availableRoles() {
        return this.shopRolesFormService.availableRoleIds;
    }

    get isAllowRemoves() {
        return !!this.rolesForm.length && (!this.disableBatchChanges || this.hasAdminRole);
    }

    get isAllowAdd() {
        return !!this.availableRoles.length && !this.hasAdminRole;
    }

    rolesForm = this.shopRolesFormService.form;
    shops$ = this.shopsService.shops$;
    RoleId = RoleId;

    private get hasAdminRole() {
        return this.rolesForm.value.findIndex((r) => r.id === RoleId.Administrator) !== -1;
    }

    constructor(
        private shopsService: ApiShopsService,
        private dialog: MatDialog,
        @Inject(DIALOG_CONFIG) private dialogConfig: DialogConfig,
        private cdr: ChangeDetectorRef,
        private shopRolesFormService: ShopRolesFormService
    ) {}

    ngOnInit() {
        this.shopRolesFormService.updatedMemberRoles$
            .pipe(untilDestroyed(this))
            .subscribe((roles) => this.selectedRoles.emit(roles));
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
            .subscribe((selectedRoleId) => {
                this.shopRolesFormService.add(selectedRoleId);
                this.cdr.detectChanges();
            });
    }

    toggle(roleControl: FormControl<ShopsRole>, shop: Shop) {
        this.shopRolesFormService.toggle(roleControl, shop.id);
    }

    toggleAll(roleControl: FormControl<ShopsRole>) {
        this.shopRolesFormService.toggleAll(roleControl).pipe(untilDestroyed(this)).subscribe();
    }

    remove(roleControl: FormControl<ShopsRole>) {
        this.shopRolesFormService.remove(roleControl);
    }

    isIntermediate(roleControl: FormControl<ShopsRole>) {
        return this.shopRolesFormService.isIntermediate(roleControl);
    }
}
