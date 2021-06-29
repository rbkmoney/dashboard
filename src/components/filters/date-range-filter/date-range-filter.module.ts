import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule } from '@angular/material/list';
import { TranslocoModule } from '@ngneat/transloco';

import { FilterModule } from '@dsh/components/filter';
import { DaterangeModule } from '@dsh/pipes/daterange';

import { DateRangeFilterComponent } from './date-range-filter.component';

@NgModule({
    imports: [
        CommonModule,
        MatDatepickerModule,
        FilterModule,
        TranslocoModule,
        MatListModule,
        DaterangeModule,
        FlexModule,
    ],
    declarations: [DateRangeFilterComponent],
    exports: [DateRangeFilterComponent],
})
export class DateRangeFilterModule {}
