import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DEFAULT_PAYMENTS_FILTERS_DATA_TOKEN } from '../../consts';
import { PaymentsFiltersData } from '../../types/payments-filters-data';
import { PaymentsFiltersStoreService } from '../payments-filters-store/payments-filters-store.service';

@Injectable()
export class PaymentsFiltersService {
    filtersData$: Observable<PaymentsFiltersData>;

    constructor(
        @Inject(DEFAULT_PAYMENTS_FILTERS_DATA_TOKEN)
        private defaultFiltersData: PaymentsFiltersData,
        private filtersParamsStore: PaymentsFiltersStoreService
    ) {
        this.initFiltersData();
    }

    changeFilters(filtersData: PaymentsFiltersData): void {
        this.filtersParamsStore.preserve(filtersData);
    }

    private initFiltersData(): void {
        this.filtersData$ = this.filtersParamsStore.data$.pipe(
            map((storeData: Partial<PaymentsFiltersData>) => {
                return {
                    ...this.defaultFiltersData,
                    ...storeData,
                };
            })
        );
    }
}
