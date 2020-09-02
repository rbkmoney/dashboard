import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of, Subject, timer } from 'rxjs';
import { catchError, distinctUntilChanged, pluck, shareReplay, switchMap, takeUntil } from 'rxjs/operators';

import { AnalyticsService } from '../../../../../../api';
import { AmountResult } from '../../../../../../api-codegen/anapi';

@Injectable()
export class ShopBalanceService {
    private shopIDChange$: Subject<string> = new BehaviorSubject(null);
    private destroy$: Subject<void> = new Subject();

    balance$: Observable<AmountResult | null> = this.shopIDChange$.pipe(
        distinctUntilChanged(),
        switchMap((shopID) => combineLatest([of(shopID), timer(0, 60000)])),
        switchMap(([shopID]) =>
            this.analyticsService.getCurrentBalances([shopID]).pipe(
                catchError((ex) => {
                    console.error(ex);
                    return of({ result: [] });
                })
            )
        ),
        pluck('result', 0),
        takeUntil(this.destroy$),
        shareReplay(1)
    );

    constructor(private analyticsService: AnalyticsService) {}

    setShopId(shopID: string) {
        this.shopIDChange$.next(shopID);
    }

    destroy() {
        this.destroy$.next();
    }
}
