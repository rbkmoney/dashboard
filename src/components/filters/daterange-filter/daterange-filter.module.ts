import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TranslocoModule } from '@ngneat/transloco';

import { DaterangeModule } from '@dsh/pipes/daterange';

import { FilterModule } from '../filter';
import { DateAdapter as CustomDateAdapter } from './date-adapter';
import { DaterangeFilterMenuComponent } from './daterange-filter-selector';
import { DaterangeFilterComponent } from './daterange-filter.component';

const EXPORTED_DECLARATIONS = [DaterangeFilterComponent, DaterangeFilterMenuComponent];

@NgModule({
    imports: [CommonModule, FlexLayoutModule, FilterModule, TranslocoModule, DaterangeModule, MatDatepickerModule],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
    providers: [{ provide: DateAdapter, useClass: CustomDateAdapter }],
})
export class DaterangeFilterModule {}
