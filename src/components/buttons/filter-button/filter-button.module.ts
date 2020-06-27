import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { TranslocoModule } from '@ngneat/transloco';

import { DropdownModule } from '../../layout/dropdown';
import { JustifyWrapperModule } from '../../layout/justify-wrapper';
import { ButtonModule } from '../button';
import { FilterButtonActionsComponent } from './filter-button-actions';
import { FilterButtonContentComponent } from './filter-button-content';
import { FilterButtonComponent } from './filter-button.component';
import { FilterByInputComponent } from './filter-by-input';

const EXPORTED_DECLARATIONS = [
    FilterButtonComponent,
    FilterButtonActionsComponent,
    FilterButtonContentComponent,
    FilterByInputComponent,
];

@NgModule({
    imports: [
        CommonModule,
        DropdownModule,
        MatDividerModule,
        ButtonModule,
        TranslocoModule,
        FlexLayoutModule,
        MatInputModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        JustifyWrapperModule,
    ],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
    providers: [],
})
export class FilterButtonModule {}
