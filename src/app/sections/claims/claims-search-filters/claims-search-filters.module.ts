import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

import { ClaimStatusesFieldModule } from '@dsh/app/shared/components/inputs/claim-statuses-field';
import { FilterModule } from '@dsh/components/filter';
import { FiltersGroupModule } from '@dsh/components/filters-group';
import { MultiselectFilterModule } from '@dsh/components/filters/multiselect-filter';
import { RadioGroupFilterModule } from '@dsh/components/filters/radio-group-filter';
import { ValueFilterModule } from '@dsh/components/filters/value-filter';

import { ClaimsSearchFiltersComponent } from './claims-search-filters.component';
import { ClaimIdFilterComponent } from './components/claim-id-filter/claim-id-filter.component';
import { ClaimStatusesFilterComponent } from './components/claim-statuses-filter/claim-statuses-filter.component';

@NgModule({
    declarations: [ClaimsSearchFiltersComponent, ClaimIdFilterComponent, ClaimStatusesFilterComponent],
    imports: [
        ValueFilterModule,
        TranslocoModule,
        RadioGroupFilterModule,
        CommonModule,
        FlexModule,
        MultiselectFilterModule,
        FiltersGroupModule,
        FilterModule,
        ClaimStatusesFieldModule,
        ReactiveFormsModule,
    ],
    exports: [ClaimsSearchFiltersComponent],
})
export class ClaimsSearchFiltersModule {}
