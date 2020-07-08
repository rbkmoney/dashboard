import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '../buttons/button';
import { DropdownModule } from '../layout/dropdown';
import { FilterButtonComponent } from './filter-button';
import { FilterButtonActionsComponent } from './filter-button-actions';
import { FilterButtonContentComponent } from './filter-button-content';
import { FilterComponent } from './filter.component';
import { MultiselectFilterComponent, MultiselectFilterContentComponent } from './multiselect-filter';

const EXPORTED_DECLARATIONS = [
    FilterComponent,
    FilterButtonComponent,
    FilterButtonActionsComponent,
    FilterButtonContentComponent,
    MultiselectFilterContentComponent,
    MultiselectFilterComponent,
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
    ],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
})
export class FilterModule {}
