import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { TranslocoModule } from '@ngneat/transloco';

import { BaseDialogModule } from '@dsh/app/shared/components/dialog/base-dialog';
import { ButtonModule } from '@dsh/components/buttons';
import { SelectionModule } from '@dsh/components/indicators/selection';
import { NestedTableModule } from '@dsh/components/nested-table';

import { ChangeRolesTableComponent } from './change-roles-table.component';
import { SelectRoleDialogComponent } from './components/select-role-dialog/select-role-dialog.component';

@NgModule({
    imports: [
        NestedTableModule,
        MatCheckboxModule,
        CommonModule,
        ButtonModule,
        FlexModule,
        BaseDialogModule,
        TranslocoModule,
        MatRadioModule,
        ReactiveFormsModule,
        SelectionModule,
    ],
    declarations: [ChangeRolesTableComponent, SelectRoleDialogComponent],
    exports: [ChangeRolesTableComponent],
})
export class ChangeRolesTableModule {}
