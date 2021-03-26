import { Component, EventEmitter, Output } from '@angular/core';
import { untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { Daterange } from '@dsh/pipes/daterange';

import { AdditionalFiltersService } from './additional-filters/additional-filters.service';
import { AdditionalFilters } from './additional-filters/types/additional-filters';
import { DepositsFiltersStoreService } from './services/deposits-filters-store/deposits-filters-store.service';
import { DepositsFiltersService } from './services/deposits-filters/deposits-filters.service';
import { DepositsFiltersData } from './types/deposits-filters-data';

@Component({
    templateUrl: 'deposits-filters.component.html',
    selector: 'dsh-deposits-filters',
    providers: [DepositsFiltersService, DepositsFiltersStoreService],
})
export class DepositsFiltersComponent {
    @Output() filtersChanged = new EventEmitter<DepositsFiltersData>();

    filtersData$: Observable<DepositsFiltersData> = this.filtersHandler.filtersData$;

    isAdditionalFilterApplied: boolean;

    constructor(private filtersHandler: DepositsFiltersService, private additionalFilters: AdditionalFiltersService) {}

    dateRangeChange(dateRange: Daterange): void {
        this.updateFilters({ daterange: dateRange });
    }

    openFiltersDialog(): void {
        this.filtersData$
            .pipe(
                take(1),
                map((filtersData: DepositsFiltersData) => filtersData.additional ?? {}),
                switchMap((filters: AdditionalFilters) => {
                    return this.additionalFilters.openFiltersDialog(filters);
                }),
                untilDestroyed(this)
            )
            .subscribe((filters: AdditionalFilters) => {
                this.updateAdditionalFiltersValues(filters);
            });
    }

    private updateFilters(change: Partial<DepositsFiltersData>): void {
        this.filtersHandler.changeFilters({
            ...change,
        });
    }

    private updateAdditionalFiltersValues(additional: AdditionalFilters): void {
        this.updateFilters({
            additional,
        });
    }
}
