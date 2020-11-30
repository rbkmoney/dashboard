import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, ReplaySubject } from 'rxjs';
import { map, mapTo, pluck, scan, shareReplay, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { SEARCH_LIMIT } from '@dsh/app/sections/constants';

import { Shop as ApiShop } from '../../../../../../api-codegen/capi/swagger-codegen';
import { PaymentInstitutionRealm } from '../../../../../../api/model';
import { ApiShopsService } from '../../../../../../api/shop';
import { SHARE_REPLAY_CONF } from '../../../../../../custom-operators';
import { filterShopsByRealm, mapToTimestamp } from '../../../../operations/operators';
import { ShopBalance } from '../../types/shop-balance';
import { ShopItem } from '../../types/shop-item';
import { ShopsBalanceService } from '../shops-balance/shops-balance.service';
import { combineShopItem } from './combine-shop-item';


@Injectable()
export class FetchShopsService {
    allShops$: Observable<ApiShop[]>;
    loadedShops$: Observable<ShopItem[]>;
    lastUpdated$: Observable<string>;
    isLoading$: Observable<boolean>;
    hasMore$: Observable<boolean>;

    private selectedIndex$ = new ReplaySubject<number>(1);
    private listOffset$: Observable<number>;

    private realmData$ = new ReplaySubject<PaymentInstitutionRealm>(1);

    private showMore$ = new ReplaySubject<void>(1);
    private loader$ = new BehaviorSubject<boolean>(true);

    constructor(
        private apiShopsService: ApiShopsService,
        private shopsBalance: ShopsBalanceService,
        @Inject(SEARCH_LIMIT)
        private searchLimit: number
    ) {
        this.initAllShopsFetching();
        this.initOffsetObservable();
        this.initShownShopsObservable();
        this.initIndicators();
    }

    initRealm(realm: PaymentInstitutionRealm): void {
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

    private initAllShopsFetching(): void {
        this.allShops$ = this.realmData$.pipe(
            filterShopsByRealm(this.apiShopsService.shops$),
            shareReplay(SHARE_REPLAY_CONF)
        );
    }

    private initOffsetObservable(): void {
        this.listOffset$ = this.showMore$.pipe(
            mapTo(this.searchLimit),
            withLatestFrom(this.selectedIndex$),
            map(([curOffset]: [number, number]) => curOffset),
            scan((offset: number, limit: number) => offset + limit, 0),
            shareReplay(SHARE_REPLAY_CONF)
        );
    }

    private initShownShopsObservable(): void {
        this.loadedShops$ = combineLatest([this.allShops$, this.listOffset$]).pipe(
            map(([shops, showedCount]: [ShopItem[], number]) => shops.slice(0, showedCount)),
            switchMap((shops: ApiShop[]) => {
                const shopIds: string[] = shops.map(({ id }: ApiShop) => id);
                return this.shopsBalance
                    .getBalances(shopIds)
                    .pipe(map((balances: ShopBalance[]) => combineShopItem(shops, balances)));
            }),
            tap(() => this.stopLoading()),
            shareReplay(SHARE_REPLAY_CONF)
        );
    }

    private initIndicators(): void {
        this.lastUpdated$ = this.allShops$.pipe(mapToTimestamp, shareReplay(1));
        this.isLoading$ = this.loader$.asObservable();
        this.hasMore$ = combineLatest([this.allShops$.pipe(pluck('length')), this.listOffset$]).pipe(
            map(([count, showedCount]: [number, number]) => count > showedCount),
            shareReplay(SHARE_REPLAY_CONF)
        );
    }
}
