import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import isEmpty from 'lodash-es/isEmpty';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { Daterange } from '@dsh/pipes/daterange';

import { AdditionalFiltersService } from './additional-filters/additional-filters.service';
import { AdditionalFilters } from './additional-filters/types/additional-filters';
import { DepositsFiltersStoreService } from './services/deposits-filters-store/deposits-filters-store.service';
import { DepositsFiltersService } from './services/deposits-filters/deposits-filters.service';
import { DepositsFiltersData } from './types/deposits-filters-data';

@UntilDestroy()
@Component({
    templateUrl: 'deposits-filters.component.html',
    selector: 'dsh-deposits-filters',
    providers: [DepositsFiltersService, DepositsFiltersStoreService],
})
export class DepositsFiltersComponent implements OnInit {
    @Output() filtersChanged = new EventEmitter<DepositsFiltersData>();

    filtersData$: Observable<DepositsFiltersData> = this.filtersHandler.filtersData$;

    isAdditionalFilterApplied: boolean;

    constructor(private filtersHandler: DepositsFiltersService, private additionalFilters: AdditionalFiltersService) {}

    ngOnInit(): void {
        this.filtersData$.pipe(untilDestroyed(this)).subscribe((filtersData: DepositsFiltersData) => {
            this.filtersChanged.emit(filtersData);
            const { additional = {} } = filtersData;
            this.updateAdditionalFiltersStatus(additional);
        });
    }

    dateRangeChange(dateRange: Daterange): void {
        this.updateFilters({ daterange: dateRange });
    }

    openFiltersDialog(): void {
        this.filtersData$
            .pipe(
                take(1),
                map((filtersData: DepositsFiltersData) => filtersData.additional ?? {}),
                switchMap((filters: AdditionalFilters) => this.additionalFilters.openFiltersDialog(filters)),
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

    private updateAdditionalFiltersStatus(additional: AdditionalFilters): void {
        this.isAdditionalFilterApplied = !isEmpty(additional);
    }
}
