import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { ButtonModule } from '@dsh/components/buttons';
import { NestedTableModule } from '@dsh/components/nested-table';

import { ChangeRolesTableComponent } from './change-roles-table.component';

@NgModule({
    imports: [
        NestedTableModule,
        MatCheckboxModule,
        CommonModule,
        ButtonModule,
        FlexModule
    ],
    declarations: [ChangeRolesTableComponent],
    exports: [ChangeRolesTableComponent],
    providers: [],
})
export class ChangeRolesTableModule {}
