import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import isEmpty from 'lodash-es/isEmpty';
import { defer, Observable, ReplaySubject } from 'rxjs';
import { map, shareReplay, switchMap, take } from 'rxjs/operators';

import { ApiShopsService } from '@dsh/api';
import { PaymentInstitution, Shop } from '@dsh/api-codegen/capi';
import { SHARE_REPLAY_CONF } from '@dsh/operators';
import { Daterange } from '@dsh/pipes/daterange';
import { ComponentChanges } from '@dsh/type-utils';

import { filterShopsByRealm } from '../../operators';
import { AdditionalFilters, AdditionalFiltersService } from './additional-filters';
import { CardBinPan } from './card-bin-pan-filter';
import { PaymentsFiltersService } from './services/payments-filters/payments-filters.service';
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

    filtersData$: Observable<PaymentsFiltersData> = this.filtersHandler.filtersData$;
    isAdditionalFilterApplied: boolean;
    shops$ = defer(() => this.realm$).pipe(filterShopsByRealm(this.shopService.shops$), shareReplay(SHARE_REPLAY_CONF));
    form = this.filtersHandler.form;

    private realm$ = new ReplaySubject<RealmEnum>(1);

    constructor(
        private filtersHandler: PaymentsFiltersService,
        private additionalFilters: AdditionalFiltersService,
        private shopService: ApiShopsService
    ) {}

    ngOnInit(): void {
        this.filtersData$.pipe(untilDestroyed(this)).subscribe((filtersData: PaymentsFiltersData) => {
            this.filtersChanged.emit(filtersData);
            const { additional = {} } = filtersData;
            this.updateAdditionalFiltersStatus(additional);
        });
        this.form.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => this.updateFilters(value));
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

    shopSelectionChange(selectedShops: Shop[]): void {
        this.updateFilters({
            shopIDs: selectedShops.map(({ id }: Shop) => id),
        });
    }

    binPanChanged(binPan: Partial<CardBinPan>): void {
        this.updateFilters({
            binPan: {
                paymentMethod: 'bankCard',
                ...binPan,
            },
        });
    }

    private updateFilters(change: Partial<PaymentsFiltersData>): void {
        this.filtersHandler.changeFilters(change);
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
