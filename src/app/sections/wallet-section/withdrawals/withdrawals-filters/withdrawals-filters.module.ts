import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslocoModule } from '@ngneat/transloco';

import { FilterModule } from '@dsh/components/filter';
import { FiltersGroupModule } from '@dsh/components/filters-group';
import { DateRangeFilterModule } from '@dsh/components/filters/date-range-filter';

import { AdditionalFiltersModule } from './additional-filters';
import { WithdrawalsFiltersComponent } from './withdrawals-filters.component';

@NgModule({
    imports: [
        CommonModule,
        TranslocoModule,
        FlexLayoutModule,
        DateRangeFilterModule,
        FiltersGroupModule,
        ReactiveFormsModule,
        MatDialogModule,
        FilterModule,
        AdditionalFiltersModule,
    ],
    declarations: [WithdrawalsFiltersComponent],
    exports: [WithdrawalsFiltersComponent],
})
export class WithdrawalsFiltersModule {}
