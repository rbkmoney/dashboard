import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
} from '@angular/core';
import isEqual from 'lodash.isequal';
import { combineLatest, Observable, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, map, scan, shareReplay, switchMap, take } from 'rxjs/operators';

import { Daterange } from '@dsh/pipes/daterange';

import { ComponentChanges } from '../../../../../type-utils';
import { Shop } from '../../../../api-codegen/capi';
import { ApiShopsService } from '../../../../api/shop';
import { daterangeToTimes, timesToDaterange } from '../../../../shared/utils';
import { filterShopsByRealm, removeEmptyProperties } from '../../operations/operators';
import { SearchParams } from '../search-params';
import { getDefaultDaterange } from './get-default-daterange';
import { shopsToCurrencies } from './shops-to-currencies';

@Component({
    selector: 'dsh-analytics-search-filters',
    templateUrl: 'analytics-search-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyticsSearchFiltersComponent implements OnChanges {
    private searchParams$: Subject<Partial<SearchParams>> = new ReplaySubject(1);

    @Input() initParams: SearchParams;

    @Input() set realm(realm: string) {
        this.realm$.next(realm);
    }

    @Output()
    searchParamsChanges = new EventEmitter<SearchParams>();

    private realm$ = new ReplaySubject();

    private shops$: Observable<Shop[]> = this.realm$.pipe(filterShopsByRealm(this.shopService.shops$), shareReplay(1));

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

    constructor(private shopService: ApiShopsService) {
        this.selectedCurrency$.subscribe((currency) => {
            this.searchParams$.next({ currency });
            this.selectedShopIDs$.next([]);
        });
        this.selectedShopIDs$.subscribe((shopIDs) => this.searchParams$.next({ shopIDs }));
        this.searchParams$
            .pipe(
                scan((acc, current) => ({ ...acc, ...current }), this.initParams),
                removeEmptyProperties,
                distinctUntilChanged(isEqual),
                shareReplay(1)
            )
            .subscribe((v) => {
                this.searchParamsChanges.emit(v);
            });
    }

    ngOnChanges({ initParams }: ComponentChanges<AnalyticsSearchFiltersComponent>) {
        if (initParams && initParams.firstChange && initParams.currentValue) {
            this.init(initParams.currentValue);
        }
    }

    daterangeSelectionChange(v: Daterange | null) {
        const daterange = v === null ? getDefaultDaterange() : v;
        if (v === null) {
            this.daterange = daterange;
        }
        this.searchParams$.next(daterangeToTimes(daterange));
    }

    shopSelectionChange(shops: Shop[]) {
        const shopIDs = shops.map((shop) => shop.id);
        this.selectedShopIDs$.next(shopIDs);
    }

    currencySelectionChange(currency: string) {
        this.selectedCurrency$.next(currency);
    }

    init({ fromTime, toTime, shopIDs, currency }: SearchParams) {
        this.daterange = fromTime && toTime ? timesToDaterange({ fromTime, toTime }) : getDefaultDaterange();
        this.daterangeSelectionChange(this.daterange);
        if (currency) {
            this.selectedCurrency$.next(currency);
        } else {
            this.currencies$.pipe(take(1)).subscribe((currencies) => this.selectedCurrency$.next(currencies[0]));
        }
        if (shopIDs) {
            this.selectedShopIDs$.next(shopIDs);
        }
    }
}
