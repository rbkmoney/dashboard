import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import isEmpty from 'lodash-es/isEmpty';
import pick from 'lodash-es/pick';
import { defer, Observable, ReplaySubject } from 'rxjs';
import { map, shareReplay, switchMap, take, withLatestFrom } from 'rxjs/operators';

import { ApiShopsService } from '@dsh/api';
import { PaymentInstitution, Shop } from '@dsh/api-codegen/capi';
import { DaterangeManagerService } from '@dsh/app/shared/services/date-range-manager';
import { SHARE_REPLAY_CONF } from '@dsh/operators';
import { Daterange } from '@dsh/pipes/daterange';
import { ComponentChanges } from '@dsh/type-utils';

import { filterShopsByRealm } from '../../operators';
import { AdditionalFilters, AdditionalFiltersService } from './additional-filters';
import { CardBinPan } from './card-bin-pan-filter';
import { PaymentsFiltersStoreService } from './services/payments-filters-store/payments-filters-store.service';
import { PaymentsFiltersData } from './types/payments-filters-data';

import RealmEnum = PaymentInstitution.RealmEnum;

@UntilDestroy()
@Component({
    selector: 'dsh-payments-filters',
    templateUrl: 'payments-filters.component.html',
})
export class PaymentsFiltersComponent implements OnInit, OnChanges {
    @Input() realm: RealmEnum;
    @Output() filtersChanged = new EventEmitter<PaymentsFiltersData>();

    filtersData$: Observable<PaymentsFiltersData> = this.filtersParamsStore.data$.pipe(
        map((storeData: Partial<PaymentsFiltersData>) => {
            return {
                daterange: this.daterangeManager.defaultDaterange,
                ...storeData,
            };
        })
    );
    isAdditionalFilterApplied: boolean;
    shops$ = defer(() => this.realm$).pipe(filterShopsByRealm(this.shopService.shops$), shareReplay(SHARE_REPLAY_CONF));
    form = this.fb.group<{ invoiceIDs: string[]; shopIDs: Shop['id'][]; binPan: CardBinPan }>({
        invoiceIDs: null,
        shopIDs: null,
        binPan: null,
    });

    private realm$ = new ReplaySubject<RealmEnum>(1);
    private filtersChange$ = new ReplaySubject<Partial<PaymentsFiltersData>>(1);

    constructor(
        private additionalFilters: AdditionalFiltersService,
        private shopService: ApiShopsService,
        private fb: FormBuilder,
        private filtersParamsStore: PaymentsFiltersStoreService,
        private daterangeManager: DaterangeManagerService
    ) {}

    ngOnInit(): void {
        this.filtersData$.pipe(untilDestroyed(this)).subscribe((filtersData: PaymentsFiltersData) => {
            this.filtersChanged.emit(filtersData);
            const { additional = {} } = filtersData;
            this.updateAdditionalFiltersStatus(additional);
        });
        this.form.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => this.updateFilters(value));

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
            .subscribe((v) => this.form.patchValue(pick(v, ['invoiceIDs', 'shopIDs', 'binPan'])));
    }

    ngOnChanges({ realm }: ComponentChanges<PaymentsFiltersComponent>): void {
        if (realm && realm.currentValue) this.realm$.next(realm.currentValue);
    }

    openFiltersDialog(): void {
        this.filtersData$
            .pipe(
                take(1),
                map((filtersData: PaymentsFiltersData) => filtersData.additional ?? {}),
                switchMap((filters: AdditionalFilters) => {
                    return this.additionalFilters.openFiltersDialog(filters);
                }),
                untilDestroyed(this)
            )
            .subscribe((filters: AdditionalFilters) => {
                this.updateAdditionalFiltersValues(filters);
            });
    }

    dateRangeChange(dateRange: Daterange): void {
        this.updateFilters({ daterange: dateRange });
    }

    private updateFilters(change: Partial<PaymentsFiltersData>): void {
        this.filtersChange$.next(change);
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
