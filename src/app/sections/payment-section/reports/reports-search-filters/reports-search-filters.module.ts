import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { FiltersModule } from '@dsh/components/filters';

import { ReportsSearchFiltersComponent } from './reports-search-filters.component';

@NgModule({
    imports: [CommonModule, TranslocoModule, FiltersModule, FlexLayoutModule],
    declarations: [ReportsSearchFiltersComponent],
    exports: [ReportsSearchFiltersComponent],
})
export class ReportsSearchFiltersModule {}
