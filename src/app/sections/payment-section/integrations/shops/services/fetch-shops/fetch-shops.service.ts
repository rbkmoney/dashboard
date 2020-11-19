import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, merge, Observable, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, map, mapTo, pluck, scan, shareReplay, switchMap, take, tap } from 'rxjs/operators';

import { getOffsetBySelectedPanelPosition } from '../../../../../../../utils';
import { Shop as ApiShop } from '../../../../../../api-codegen/anapi/swagger-codegen';
import { PaymentInstitutionRealm } from '../../../../../../api/model';
import { ApiShopsService } from '../../../../../../api/shop';
import { SHARE_REPLAY_CONF } from '../../../../../../custom-operators';
import { filterShopsByRealm, mapToTimestamp } from '../../../../operations/operators';
import { ShopBalance, ShopItem } from '../../models';
import { combineShopItem } from '../../utils';
import { ShopsBalanceService } from '../shops-balance/shops-balance.service';

const LIST_OFFSET = 5;

@Injectable()
export class FetchShopsService {
    shops$: Observable<ShopItem[]>;
    lastUpdated$: Observable<string>;
    isLoading$: Observable<boolean>;
    hasMore$: Observable<boolean>;

    private allShops$: Observable<ShopItem[]>;
    private selectedID$ = new ReplaySubject<string>(1);
    private listOffset$: Observable<number>;

    private realmData$ = new ReplaySubject<PaymentInstitutionRealm>(1);

    // actions
    private showMore$ = new Subject<void>();
    private loader$ = new BehaviorSubject<boolean>(true);

    constructor(private apiShopsService: ApiShopsService, private shopsBalance: ShopsBalanceService) {
        this.init();
    }

    setSelectedID(id: string): void {
        this.selectedID$.next(id);
    }

    setRealm(realm: PaymentInstitutionRealm): void {
        this.realmData$.next(realm);
    }

    refreshData(): void {
        this.startLoading();
        this.apiShopsService.reloadShops();
    }

    showMore(): void {
        this.showMore$.next();
    }

    protected startLoading(): void {
        this.loader$.next(true);
    }

    protected stopLoading(): void {
        this.loader$.next(false);
    }

    protected updateShopsBalances(shops: ApiShop[]) {
        const shopIds = shops.map(({ id }: ApiShop) => id);
        this.shopsBalance.setShopIds(shopIds);
    }

    protected init(): void {
        this.initAllShopsFetching();
        this.initOffsetListeners();
        this.initShownShopsListeners();
        this.initIndicators();
    }

    private initAllShopsFetching(): void {
        this.allShops$ = this.realmData$.pipe(
            filterShopsByRealm(this.apiShopsService.shops$),
            tap((shops: ApiShop[]) => {
                this.updateShopsBalances(shops);
            }),
            switchMap((shops: ApiShop[]) => {
                return this.shopsBalance.balances$.pipe(
                    distinctUntilChanged(),
                    map((balances: ShopBalance[]) => combineShopItem(shops, balances))
                );
            }),
            tap(() => this.stopLoading()),
            shareReplay(SHARE_REPLAY_CONF)
        );
    }

    private initOffsetListeners(): void {
        const selectedPanelPosition$ = combineLatest([this.selectedID$.pipe(take(1)), this.allShops$]).pipe(
            map(([selectedId, shops]: [string, ShopItem[]]) => shops.findIndex(({ id }) => id === selectedId)),
            shareReplay(SHARE_REPLAY_CONF)
        );

        this.listOffset$ = merge(
            selectedPanelPosition$.pipe(map((idx: number) => getOffsetBySelectedPanelPosition(idx, LIST_OFFSET))),
            this.showMore$.pipe(mapTo(LIST_OFFSET))
        ).pipe(
            scan((offset, limit) => offset + limit, 0),
            shareReplay(SHARE_REPLAY_CONF)
        );
    }

    private initShownShopsListeners(): void {
        this.shops$ = combineLatest([this.allShops$, this.listOffset$]).pipe(
            map(([shops, showedCount]: [ShopItem[], number]) => shops.slice(0, showedCount)),
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
