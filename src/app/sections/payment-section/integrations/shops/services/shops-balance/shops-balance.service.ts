import { Injectable } from '@angular/core';
import { isNil } from '@ngneat/transloco';
import { Observable, of, ReplaySubject } from 'rxjs';
import { catchError, distinctUntilChanged, map, shareReplay, switchMap } from 'rxjs/operators';

import { AnalyticsService } from '../../../../../../api/analytics';
import { SHARE_REPLAY_CONF } from '../../../../../../custom-operators';
import { ShopBalance } from '../../types';

@Injectable()
export class ShopsBalanceService {
    balances$: Observable<ShopBalance[]>;

    private shopIDsChange$ = new ReplaySubject<string[]>(1);

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
                                    data: isNil(amountResults) || isNil(amountResults[0]) ? null : amountResults[0],
                                };
                            });
                    }),
                    catchError((err) => {
                        console.error(err);
                        return of([]);
                    })
                );
            }),
            shareReplay(SHARE_REPLAY_CONF)
        );
    }

    setShopIds(shopIDs: string[]): void {
        this.shopIDsChange$.next(shopIDs);
    }
}
