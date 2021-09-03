import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

import { DaterangeManagerModule } from '@dsh/app/shared/services/date-range-manager';
import { FilterModule } from '@dsh/components/filter';
import { FiltersGroupModule } from '@dsh/components/filters-group';
import { DateRangeFilterModule } from '@dsh/components/filters/date-range-filter';

import { AdditionalFiltersModule } from './additional-filters';
import { DepositsFiltersComponent } from './deposits-filters.component';

@NgModule({
    imports: [
        DaterangeManagerModule,
        FlexModule,
        CommonModule,
        TranslocoModule,
        AdditionalFiltersModule,
        DateRangeFilterModule,
        FiltersGroupModule,
        ReactiveFormsModule,
        FilterModule,
    ],
    declarations: [DepositsFiltersComponent],
    exports: [DepositsFiltersComponent],
})
export class DepositsFiltersModule {}
