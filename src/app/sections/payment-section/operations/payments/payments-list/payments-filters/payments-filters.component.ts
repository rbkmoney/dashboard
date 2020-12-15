import { Component, Input, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import isEmpty from 'lodash.isempty';
import { Observable, of, ReplaySubject } from 'rxjs';
import { map, switchMap, take, withLatestFrom } from 'rxjs/operators';

import { Shop } from '@dsh/api-codegen/capi';
import { PaymentInstitutionRealm } from '@dsh/api/model';
import { ApiShopsService } from '@dsh/api/shop';
import { Daterange } from '@dsh/pipes/daterange';

import { filterShopsByRealm } from '../../../operators';
import { AdditionalFiltersService } from './additional-filters';
import { PaymentsFiltersService } from './services/payments-filters/payments-filters.service';
import { PaymentsAdditionalFilters } from './types/payments-additional-filters';
import { PaymentsFiltersData } from './types/payments-filters-data';

@UntilDestroy()
@Component({
    selector: 'dsh-payments-filters',
    templateUrl: './payments-filters.component.html',
    styleUrls: ['./payments-filters.component.scss'],
})
export class PaymentsFiltersComponent implements OnInit {
    @Input() realm: PaymentInstitutionRealm;

    filtersData$: Observable<PaymentsFiltersData> = this.filtersHandler.filtersData$;

    isAdditionalFilterApplied: boolean;

    shops$: Observable<Shop[]>;
    selectedShops$: Observable<Shop[]>;

    private filtersChange$ = new ReplaySubject<Partial<PaymentsFiltersData>>(1);

    constructor(
        private shopService: ApiShopsService,
        private filtersHandler: PaymentsFiltersService,
        private additionalFilters: AdditionalFiltersService
    ) {}

    ngOnInit(): void {
        this.shops$ = of(this.realm).pipe(filterShopsByRealm(this.shopService.shops$));

        this.selectedShops$ = this.filtersData$.pipe(
            map(({ shopIds }: PaymentsFiltersData) => {
                return shopIds.reduce((idsMap: Map<string, string>, id: string) => {
                    idsMap.set(id, id);
                    return idsMap;
                }, new Map<string, string>());
            }),
            withLatestFrom(this.shops$),
            map(([selectedIdsMap, shopsList]: [Map<string, string>, Shop[]]) => {
                return shopsList.map((shop: Shop) => (selectedIdsMap.has(shop.id) ? shop : null)).filter(Boolean);
            })
        );

        this.filtersChange$
            .pipe(
                withLatestFrom(this.filtersData$),
                map(([changes, currentData]: [Partial<PaymentsFiltersData>, PaymentsFiltersData]) => {
                    return {
                        ...currentData,
                        ...changes,
                    };
                }),
                untilDestroyed(this)
            )
            .subscribe((filtersData: PaymentsFiltersData) => {
                this.filtersHandler.changeFilters(filtersData);
            });
    }

    openFiltersDialog() {
        this.filtersChange$
            .pipe(
                take(1),
                map((filtersData: PaymentsFiltersData) => filtersData.additional),
                switchMap((filters: PaymentsAdditionalFilters) => {
                    return this.additionalFilters.openFiltersDialog(filters);
                })
            )
            .subscribe((filters: PaymentsAdditionalFilters) => {
                this.isAdditionalFilterApplied = !isEmpty(filters);
            });
    }

    dateRangeChange(dateRange: Daterange): void {
        this.updateFilters({ dateRange });
    }

    invoiceSelectionChange(invoiceIds: string[]): void {
        this.updateFilters({ invoiceIds });
    }

    shopSelectionChange(selectedShops: Shop[]): void {
        this.updateFilters({
            shopIds: selectedShops.map(({ id }: Shop) => id),
        });
    }

    private updateFilters(change: Partial<PaymentsFiltersData>): void {
        this.filtersChange$.next({
            ...change,
        });
    }
}
