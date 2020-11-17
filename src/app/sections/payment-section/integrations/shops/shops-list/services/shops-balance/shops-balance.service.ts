import { Injectable } from '@angular/core';
import { isNil } from '@ngneat/transloco';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, map, shareReplay, switchMap, takeUntil } from 'rxjs/operators';

import { AnalyticsService } from '../../../../../../../api/analytics';
import { ShopBalance } from '../../interfaces';

@Injectable()
export class ShopsBalanceService {
    balances$: Observable<ShopBalance[]>;

    private shopIDsChange$: Subject<string[]> = new BehaviorSubject([]);
    private destroy$: Subject<void> = new Subject();

    constructor(private analyticsService: AnalyticsService) {
        this.balances$ = this.shopIDsChange$.pipe(
            distinctUntilChanged(),
            switchMap((shopIDs: string[]) => {
                return this.analyticsService.getGroupBalances({ shopIDs }).pipe(
                    map(({ result }) => {
                        return result
                            .flatMap(({ groupBySHopResults }) => groupBySHopResults)
                            .map(({ id, amountResults = [] }) => {
                                return {
                                    id,
                                    data: isNil(amountResults) ? null : amountResults[0],
                                };
                            });
                    }),
                    catchError((err) => {
                        console.error(err);
                        return of([] as ShopBalance[]);
                    })
                );
            }),
            takeUntil(this.destroy$),
            shareReplay(1)
        );
    }

    setShopIds(shopIDs: string[]) {
        this.shopIDsChange$.next(shopIDs);
    }

    destroy() {
        this.destroy$.next();
    }
}
