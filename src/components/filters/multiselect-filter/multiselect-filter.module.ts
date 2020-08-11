import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '../../buttons';
import { FilterModule } from '../filter';
import { MultiselectFilterOptionComponent } from './multiselect-filter-option';
import { MultiselectFilterComponent } from './multiselect-filter.component';

const EXPORTED_DECLARATIONS = [MultiselectFilterComponent, MultiselectFilterOptionComponent];

@NgModule({
    imports: [
        CommonModule,
        MatDividerModule,
        ButtonModule,
        TranslocoModule,
        FlexLayoutModule,
        MatInputModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        FilterModule,
    ],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
})
export class MultiselectFilterModule {}
