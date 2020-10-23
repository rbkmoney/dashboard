import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '../../buttons';
import { FilterModule } from '../filter';
import { RadioGroupFilterOptionComponent } from './radio-group-filter-option';
import { RadioGroupFilterComponent } from './radio-group-filter.component';

const EXPORTED_DECLARATIONS = [RadioGroupFilterComponent, RadioGroupFilterOptionComponent];

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
        MatRadioModule,
    ],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
})
export class RadioGroupFilterModule {}
