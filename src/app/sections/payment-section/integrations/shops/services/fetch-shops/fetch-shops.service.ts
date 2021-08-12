import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import isNil from 'lodash-es/isNil';
import { BehaviorSubject, combineLatest, Observable, ReplaySubject } from 'rxjs';
import { map, mapTo, pluck, scan, shareReplay, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { PaymentInstitution, Shop as ApiShop } from '@dsh/api-codegen/capi/swagger-codegen';
import { ApiShopsService } from '@dsh/api/shop';
import { mapToTimestamp, shareReplayRefCount } from '@dsh/operators';

import { filterShopsByRealm } from '../../../../operations/operators';
import { ShopBalance } from '../../types/shop-balance';
import { ShopFiltersData } from '../../types/shop-filters-data';
import { ShopItem } from '../../types/shop-item';
import { ShopsBalanceService } from '../shops-balance/shops-balance.service';
import { ShopsFiltersStoreService } from '../shops-filters-store/shops-filters-store.service';
import { ShopsFiltersService } from '../shops-filters/shops-filters.service';
import { combineShopItem } from './combine-shop-item';

import RealmEnum = PaymentInstitution.RealmEnum;

const DEFAULT_LIST_PAGINATION_OFFSET = 20;

export const SHOPS_LIST_PAGINATION_OFFSET = new InjectionToken('shops-list-pagination-offset');

@Injectable()
export class FetchShopsService {
    allShops$: Observable<ApiShop[]>;
    shownShops$: Observable<ShopItem[]>;
    lastUpdated$: Observable<string>;
    isLoading$: Observable<boolean>;
    hasMore$: Observable<boolean>;

    private selectedIndex$ = new ReplaySubject<number>(1);
    private listOffset$: Observable<number>;

    private realmData$ = new ReplaySubject<RealmEnum>(1);

    private showMore$ = new ReplaySubject<void>(1);
    private loader$ = new BehaviorSubject<boolean>(true);
    private filters$ = new ReplaySubject<ShopFiltersData>(1);
    private filteredShops$: Observable<ShopItem[]>;

    constructor(
        private apiShopsService: ApiShopsService,
        private shopsBalance: ShopsBalanceService,
        private filtersStore: ShopsFiltersStoreService,
        private filtersService: ShopsFiltersService,
        @Optional()
        @Inject(SHOPS_LIST_PAGINATION_OFFSET)
        private paginationOffset: number = DEFAULT_LIST_PAGINATION_OFFSET
    ) {
        this.initPaginationOffset();
        this.initAllShopsFetching();
        this.initOffsetObservable();
        this.initFilteredShopsObservable();
        this.initShownShopsObservable();
        this.initIndicators();
        this.initFiltersStore();
    }

    initRealm(realm: RealmEnum): void {
        this.realmData$.next(realm);
    }

    initOffsetIndex(offsetIndex: number): void {
        this.selectedIndex$.next(offsetIndex);
        this.showMore$.next();
    }

    refreshData(): void {
        this.startLoading();
        this.apiShopsService.reloadShops();
    }

    showMore(): void {
        this.startLoading();
        this.showMore$.next();
    }

    protected startLoading(): void {
        this.loader$.next(true);
    }

    protected stopLoading(): void {
        this.loader$.next(false);
    }

    protected updateFilters(data: ShopFiltersData): void {
        this.startLoading();
        this.filters$.next(data);
    }

    private initPaginationOffset(): void {
        if (isNil(this.paginationOffset)) {
            this.paginationOffset = DEFAULT_LIST_PAGINATION_OFFSET;
        }
    }

    private initAllShopsFetching(): void {
        this.allShops$ = this.realmData$.pipe(filterShopsByRealm(this.apiShopsService.shops$), shareReplayRefCount());
    }

    private initOffsetObservable(): void {
        this.listOffset$ = this.showMore$.pipe(
            mapTo(this.paginationOffset),
            withLatestFrom(this.selectedIndex$),
            map(([curOffset]: [number, number]) => curOffset),
            scan((offset: number, limit: number) => offset + limit, 0),
            shareReplayRefCount()
        );
    }

    private initFilteredShopsObservable(): void {
        this.filteredShops$ = combineLatest([this.allShops$, this.filters$, this.listOffset$]).pipe(
            map(([shops, filters]: [ShopItem[], ShopFiltersData, number]) => {
                return this.filtersService.filterShops(shops, filters);
            })
        );
    }

    private initShownShopsObservable(): void {
        this.shownShops$ = combineLatest([this.filteredShops$, this.listOffset$]).pipe(
            map(([filteredShops, showedCount]: [ShopItem[], number]) => {
                return this.sliceOffset(filteredShops, showedCount);
            }),
            switchMap((shops: ApiShop[]) => {
                const shopIds: string[] = shops.map(({ id }: ApiShop) => id);
                return this.shopsBalance
                    .getBalances(shopIds)
                    .pipe(map((balances: ShopBalance[]) => combineShopItem(shops, balances)));
            }),
            tap(() => this.stopLoading()),
            shareReplayRefCount()
        );
    }

    private initIndicators(): void {
        this.lastUpdated$ = this.allShops$.pipe(mapToTimestamp, shareReplay(1));
        this.isLoading$ = this.loader$.asObservable();

        this.hasMore$ = combineLatest([
            this.filteredShops$.pipe(pluck('length')),
            this.shownShops$.pipe(pluck('length')),
        ]).pipe(
            map(([count, showedCount]: [number, number]) => count > showedCount),
            shareReplayRefCount()
        );
    }

    private initFiltersStore(): void {
        this.filtersStore.data$.subscribe((filtersData: ShopFiltersData) => {
            this.updateFilters(filtersData);
        });
    }

    private sliceOffset(list: ShopItem[], offset: number): ShopItem[] {
        return list.slice(0, offset);
    }
}
