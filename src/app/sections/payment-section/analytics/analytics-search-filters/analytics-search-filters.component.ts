import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import isEqual from 'lodash.isequal';
import { combineLatest, Observable, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, map, scan, shareReplay, switchMap, take } from 'rxjs/operators';

import { Daterange } from '@dsh/pipes/daterange';

import { Shop } from '../../../../api-codegen/capi';
import { ShopService } from '../../../../api/shop';
import { SHARE_REPLAY_CONF } from '../../../../custom-operators';
import { filterShopsByEnv, removeEmptyProperties } from '../../operations/operators';
import { searchFilterParamsToDaterange } from '../../reports/reports-search-filters/search-filter-params-to-daterange';
import { SearchParams } from '../search-params';
import { daterangeToSearchParams } from './daterange-to-search-params';
import { getDefaultDaterange } from './get-default-daterange';
import { shopsToCurrencies } from './shops-to-currencies';

@Component({
    selector: 'dsh-analytics-search-filters',
    templateUrl: 'analytics-search-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyticsSearchFiltersComponent implements OnInit, OnChanges {
    private searchParams$: Subject<Partial<SearchParams>> = new ReplaySubject(1);

    @Input() initParams: SearchParams;

    @Input() set envID(envID: string) {
        this.envID$.next(envID);
    }

    @Output()
    searchParamsChanges = new EventEmitter<SearchParams>();

    private envID$ = new ReplaySubject();

    private shops$: Observable<Shop[]> = this.envID$.pipe(
        filterShopsByEnv(this.shopService.shops$),
        shareReplay(SHARE_REPLAY_CONF)
    );

    currencies$: Observable<string[]> = this.shops$.pipe(map(shopsToCurrencies), shareReplay(1));

    selectedCurrency$ = new ReplaySubject<string>(1);

    shopsByCurrency$: Observable<Shop[]> = combineLatest([this.selectedCurrency$, this.shops$]).pipe(
        map(([currency, shops]) => shops.filter((shop) => shop.account?.currency === currency)),
        shareReplay(1)
    );

    daterange: Daterange;

    private selectedShopIDs$ = new ReplaySubject<string[]>(1);

    selectedShops$ = this.selectedShopIDs$.pipe(
        switchMap((ids) =>
            this.shops$.pipe(
                take(1),
                map((shops) => shops.filter((shop) => ids.includes(shop.id)))
            )
        ),
        shareReplay(1)
    );

    constructor(private shopService: ShopService) {}

    ngOnInit() {
        this.selectedCurrency$.subscribe((currency) => {
            this.searchParams$.next({ currency });
            this.selectedShopIDs$.next([]);
        });
        this.selectedShopIDs$.subscribe((shopIDs) => this.searchParams$.next({ shopIDs }));
        this.searchParams$
            .pipe(
                distinctUntilChanged(isEqual),
                scan((acc, current) => ({ ...acc, ...current }), this.initParams),
                removeEmptyProperties
            )
            .subscribe((v) => this.searchParamsChanges.emit(v));
    }

    ngOnChanges({ initParams }: SimpleChanges) {
        if (initParams && initParams.firstChange && initParams.currentValue) {
            const v = initParams.currentValue;
            this.daterange = !(v.fromTime || v.toTime) ? getDefaultDaterange() : searchFilterParamsToDaterange(v);
            this.daterangeSelectionChange(this.daterange);
            if (v.currency) {
                this.selectedCurrency$.next(v.currency);
            } else {
                this.currencies$.pipe(take(1)).subscribe((currencies) => this.selectedCurrency$.next(currencies[0]));
            }
            if (v.shopIDs) {
                this.selectedShopIDs$.next(v.shopIDs);
            }
        }
    }

    daterangeSelectionChange(v: Daterange | null) {
        const daterange = v === null ? getDefaultDaterange() : v;
        if (v === null) {
            this.daterange = daterange;
        }
        this.searchParams$.next(daterangeToSearchParams(daterange));
    }

    shopSelectionChange(shops: Shop[]) {
        const shopIDs = shops.map((shop) => shop.id);
        this.selectedShopIDs$.next(shopIDs);
    }

    currencySelectionChange(currency: string) {
        this.selectedCurrency$.next(currency);
    }
}
