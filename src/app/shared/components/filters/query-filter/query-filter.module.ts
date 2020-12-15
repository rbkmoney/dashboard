import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { FilterModule } from '@dsh/components/filters/filter';

import { QueryFilterComponent } from './query-filter.component';

@NgModule({
    imports: [
        CommonModule,
        FilterModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatButtonModule,
        MatIconModule,
    ],
    declarations: [QueryFilterComponent],
    exports: [QueryFilterComponent],
})
export class QueryFilterModule {}
