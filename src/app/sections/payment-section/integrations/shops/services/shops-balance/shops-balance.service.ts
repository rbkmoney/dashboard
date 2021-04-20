import { Injectable } from '@angular/core';
import isNil from 'lodash-es/isNil';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AnalyticsService } from '@dsh/api/analytics';

import { ShopBalance } from '../../types/shop-balance';

@Injectable()
export class ShopsBalanceService {
    constructor(private analyticsService: AnalyticsService) {}

    getBalances(shopIDs: string[]): Observable<ShopBalance[]> {
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
    }
}
