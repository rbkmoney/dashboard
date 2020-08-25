import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslocoModule } from '@ngneat/transloco';

import { FiltersModule } from '@dsh/components/filters';

import { ReportsSearchFiltersComponent } from './reports-search-filters.component';
import { ReportsSearchOtherFiltersComponent } from './reports-search-other-filters';

@NgModule({
    imports: [CommonModule, TranslocoModule, FiltersModule, FlexLayoutModule, MatDialogModule],
    declarations: [ReportsSearchFiltersComponent, ReportsSearchOtherFiltersComponent],
    exports: [ReportsSearchFiltersComponent],
})
export class ReportsSearchFiltersModule {}
