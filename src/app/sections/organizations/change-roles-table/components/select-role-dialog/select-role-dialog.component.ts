import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@ngneat/reactive-forms';

import { RoleId } from '@dsh/api-codegen/organizations';
import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';

import { ROLES_ACCESSES } from './roles-accesses';
import { ROLES_PRIORITY } from './roles-priority';
import { SelectRoleDialogResult } from './types/select-role-dialog-result';
import { SelectRoleDialogData } from './types/selected-role-dialog-data';

@Component({
    selector: 'dsh-select-role-dialog',
    templateUrl: 'select-role-dialog.component.html',
    styleUrls: ['select-role-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectRoleDialogComponent {
    roleControl = this.fb.control<RoleId>(null, Validators.required);
    accesses = ROLES_ACCESSES;
    get rowsGridTemplateColumns() {
        return `2fr ${'1fr '.repeat(this.data.availableRoles.length)}`;
    }
    get roles() {
        return this.data.availableRoles.sort((a, b) => ROLES_PRIORITY[b] - ROLES_PRIORITY[a]);
    }

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: SelectRoleDialogData,
        private dialogRef: MatDialogRef<SelectRoleDialogComponent, SelectRoleDialogResult>,
        private fb: FormBuilder
    ) {}

    cancel() {
        this.dialogRef.close(BaseDialogResponseStatus.ERROR);
    }

    select() {
        this.dialogRef.close({
            selectedRoleId: this.roleControl.value,
        });
    }
}
