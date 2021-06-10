import { Injectable } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import pick from 'lodash-es/pick';
import { ReplaySubject } from 'rxjs';
import { map, take, withLatestFrom } from 'rxjs/operators';

import { Shop } from '@dsh/api-codegen/capi';
import { DaterangeManagerService } from '@dsh/app/shared/services/date-range-manager';

import { PaymentsFiltersData } from '../../types/payments-filters-data';
import { PaymentsFiltersStoreService } from '../payments-filters-store/payments-filters-store.service';

@UntilDestroy()
@Injectable()
export class PaymentsFiltersService {
    filtersData$ = this.filtersParamsStore.data$.pipe(
        map((storeData: Partial<PaymentsFiltersData>) => {
            return {
                daterange: this.daterangeManager.defaultDaterange,
                ...storeData,
            };
        })
    );
    form = this.fb.group<{ invoiceIDs: string[]; shopIDs: Shop['id'][] }>({ invoiceIDs: [], shopIDs: [] });

    private filtersChange$ = new ReplaySubject<Partial<PaymentsFiltersData>>(1);

    constructor(
        private daterangeManager: DaterangeManagerService,
        private filtersParamsStore: PaymentsFiltersStoreService,
        private fb: FormBuilder
    ) {
        this.initUpdatesData();
    }

    changeFilters(dataChange: Partial<PaymentsFiltersData>): void {
        this.filtersChange$.next(dataChange);
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
        this.filtersData$
            .pipe(take(1), untilDestroyed(this))
            .subscribe((v) => this.form.patchValue(pick(v, ['invoiceIDs', 'shopIDs'])));
    }
}
