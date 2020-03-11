import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SearchService } from '../../api-codegen/anapi';
import { genXRequestID, toDateLike } from '../utils';
import { PayoutsSearchParams, PayoutsWithToken } from './model';

@Injectable()
export class PayoutSearchService {
    constructor(private searchService: SearchService) {}

    searchPayouts(
        fromTime: string,
        toTime: string,
        limit: number,
        options: PayoutsSearchParams
    ): Observable<PayoutsWithToken> {
        return this.searchService.searchPayouts(
            genXRequestID(),
            toDateLike(fromTime),
            toDateLike(toTime),
            limit,
            undefined,
            options.shopID,
            options.offset,
            options.payoutID,
            options.payoutToolType,
            options.excludedShops,
            options.continuationToken
        );
    }
}
