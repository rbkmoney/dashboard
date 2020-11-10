import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ColoredIconModule } from '../../indicators';
import { FilterModule } from '../filter';
import { MultiValueFilterComponent } from './multi-value-filter.component';

const EXPORTED_DECLARATIONS = [MultiValueFilterComponent];

@NgModule({
    imports: [
        FilterModule,
        ReactiveFormsModule,
        CommonModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        ColoredIconModule,
    ],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
})
export class MultiValueFilterModule {}
