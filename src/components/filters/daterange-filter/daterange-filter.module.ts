import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';
import { SatDatepickerModule } from 'saturn-datepicker';

import { DaterangeModule } from '@dsh/pipes/daterange';

import { FilterModule } from '../filter';
import { DaterangeFilterComponent } from './daterange-filter.component';

const EXPORTED_DECLARATIONS = [DaterangeFilterComponent];

@NgModule({
    imports: [CommonModule, SatDatepickerModule, FlexLayoutModule, FilterModule, TranslocoModule, DaterangeModule],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
})
export class DaterangeFilterModule {}
