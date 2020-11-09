import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { LayoutModule } from '../../layout';
import { FilterModule } from '../filter';
import { ValueFilterComponent } from './value-filter.component';

const EXPORTED_DECLARATIONS = [ValueFilterComponent];

@NgModule({
    imports: [
        FilterModule,
        ReactiveFormsModule,
        CommonModule,
        LayoutModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
    ],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
})
export class ValueFilterModule {}
