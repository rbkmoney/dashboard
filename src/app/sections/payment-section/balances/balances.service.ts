import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject, Subject, timer } from 'rxjs';
import { catchError, map, pluck, shareReplay, switchMap, switchMapTo, takeUntil } from 'rxjs/operators';

import { AnalyticsService, ShopService } from '../../../api';
import { AmountResult } from '../../../api-codegen/anapi';
import { filterShopsByEnv } from '../operations/operators';

@Injectable()
export class BalancesService {
    private env$: Subject<string> = new ReplaySubject(1);
    private destroy$: Subject<void> = new Subject();

    balances$: Observable<AmountResult[]>;

    balancesCount$: Observable<number>;

    constructor(private analyticsService: AnalyticsService, private shopService: ShopService) {
        const shopIds$ = this.env$.pipe(
            filterShopsByEnv(this.shopService.shops$),
            map((shops) => shops.map((shop) => shop.id))
        );
        this.balances$ = timer(0, 60000).pipe(
            switchMapTo(shopIds$),
            switchMap((shopIDs) =>
                this.analyticsService.getCurrentBalances(shopIDs).pipe(
                    catchError((ex) => {
                        console.error(ex);
                        return of({ result: [] });
                    })
                )
            ),
            pluck('result'),
            takeUntil(this.destroy$),
            shareReplay(1)
        );
        this.balancesCount$ = this.balances$.pipe(pluck('length'), shareReplay(1));
    }

    init(env: string) {
        this.env$.next(env);
    }

    destroy() {
        this.destroy$.next();
    }
}
