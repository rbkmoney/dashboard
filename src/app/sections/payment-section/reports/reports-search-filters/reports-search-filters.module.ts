import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

import { ReportTypesFieldModule } from '@dsh/app/shared/components/inputs/report-types-field';
import { FilterModule } from '@dsh/components/filter';
import { FiltersGroupModule } from '@dsh/components/filters-group';
import { DaterangeFilterModule } from '@dsh/components/filters/daterange-filter';

import { ReportPipesModule } from '../report-pipes';
import { ReportTypesFilterComponent } from './report-types-filter';
import { ReportsSearchFiltersComponent } from './reports-search-filters.component';

@NgModule({
    imports: [
        CommonModule,
        TranslocoModule,
        FilterModule,
        FlexLayoutModule,
        ReportPipesModule,
        ReportTypesFieldModule,
        DaterangeFilterModule,
        ReactiveFormsModule,
        FiltersGroupModule,
    ],
    declarations: [ReportsSearchFiltersComponent, ReportTypesFilterComponent],
    exports: [ReportsSearchFiltersComponent],
})
export class ReportsSearchFiltersModule {}
