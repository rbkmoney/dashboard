import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

import { FiltersGroupModule } from '@dsh/components/filters-group';
import { DateRangeFilterModule } from '@dsh/components/filters/date-range-filter';

import { WithdrawalsFiltersComponent } from './withdrawals-filters.component';

@NgModule({
    imports: [
        CommonModule,
        TranslocoModule,
        FlexLayoutModule,
        DateRangeFilterModule,
        FiltersGroupModule,
        ReactiveFormsModule,
    ],
    declarations: [WithdrawalsFiltersComponent],
    exports: [WithdrawalsFiltersComponent],
})
export class WithdrawalsFiltersModule {}
