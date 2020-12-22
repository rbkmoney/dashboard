import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, ReplaySubject } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

import { DaterangeManagerService } from '@dsh/app/shared/services/date-range-manager';

import { PaymentsFiltersData } from '../../types/payments-filters-data';
import { PaymentsFiltersStoreService } from '../payments-filters-store/payments-filters-store.service';

@UntilDestroy()
@Injectable()
export class PaymentsFiltersService {
    filtersData$: Observable<PaymentsFiltersData>;

    private filtersChange$ = new ReplaySubject<Partial<PaymentsFiltersData>>(1);

    constructor(
        private daterangeManager: DaterangeManagerService,
        private filtersParamsStore: PaymentsFiltersStoreService
    ) {
        this.initFiltersData();
        this.initUpdatesData();
    }

    changeFilters(dataChange: Partial<PaymentsFiltersData>): void {
        this.filtersChange$.next(dataChange);
    }

    private initFiltersData(): void {
        this.filtersData$ = this.filtersParamsStore.data$.pipe(
            map((storeData: Partial<PaymentsFiltersData>) => {
                return {
                    daterange: this.daterangeManager.defaultDateRange,
                    ...storeData,
                };
            })
        );
    }

    private initUpdatesData(): void {
        this.filtersChange$
            .pipe(
                withLatestFrom(this.filtersData$),
                map(([dataChange, filtersData]: [Partial<PaymentsFiltersData>, PaymentsFiltersData]) => {
                    return {
                        ...filtersData,
                        ...dataChange,
                    };
                }),
                untilDestroyed(this)
            )
            .subscribe((updatedData: PaymentsFiltersData) => {
                this.filtersParamsStore.preserve(updatedData);
            });
    }
}
