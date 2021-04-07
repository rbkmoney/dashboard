import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, ReplaySubject } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

import { DaterangeManagerService } from '@dsh/app/shared/services/date-range-manager';

import { DepositsFiltersData } from '../../types/deposits-filters-data';
import { DepositsFiltersStoreService } from '../deposits-filters-store/deposits-filters-store.service';

@UntilDestroy()
@Injectable()
export class DepositsFiltersService {
    filtersData$: Observable<DepositsFiltersData>;

    private filtersChange$ = new ReplaySubject<Partial<DepositsFiltersData>>(1);

    constructor(
        private daterangeManager: DaterangeManagerService,
        private filtersParamsStore: DepositsFiltersStoreService
    ) {
        this.initFiltersData();
        this.initUpdatesData();
    }

    changeFilters(dataChange: Partial<DepositsFiltersData>): void {
        this.filtersChange$.next(dataChange);
    }

    private initFiltersData(): void {
        this.filtersData$ = this.filtersParamsStore.data$.pipe(
            map((storeData: Partial<DepositsFiltersData>) => {
                return {
                    daterange: this.daterangeManager.defaultDaterange,
                    ...storeData,
                };
            })
        );
    }

    private initUpdatesData(): void {
        this.filtersChange$
            .pipe(
                withLatestFrom(this.filtersData$),
                map(([dataChange, filtersData]: [Partial<DepositsFiltersData>, DepositsFiltersData]) => {
                    return {
                        ...filtersData,
                        ...dataChange,
                    };
                }),
                untilDestroyed(this)
            )
            .subscribe((updatedData: DepositsFiltersData) => {
                this.filtersParamsStore.preserve(updatedData);
            });
    }
}
