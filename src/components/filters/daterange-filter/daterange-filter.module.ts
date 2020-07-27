import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SatDatepickerModule } from 'saturn-datepicker';

import { FilterModule } from '../filter';
import { DaterangeFilterComponent } from './daterange-filter.component';

const EXPORTED_DECLARATIONS = [DaterangeFilterComponent];

@NgModule({
    imports: [CommonModule, SatDatepickerModule, FlexLayoutModule, FilterModule],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
})
export class DaterangeFilterModule {}
