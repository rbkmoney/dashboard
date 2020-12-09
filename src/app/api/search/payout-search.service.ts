import { Injectable } from '@angular/core';

import { SearchService } from '@dsh/api-codegen/anapi';

import { genXRequestID, toDateLike } from '../utils';
import { PayoutsSearchParams } from './model';

@Injectable()
export class PayoutSearchService {
    constructor(private searchService: SearchService) {}

    searchPayouts(fromTime: string, toTime: string, limit: number, options: PayoutsSearchParams) {
        return this.searchService.searchPayouts(
            genXRequestID(),
            toDateLike(fromTime),
            toDateLike(toTime),
            limit,
            undefined,
            undefined,
            options.shopID,
            options.shopIDs,
            options.paymentInstitutionRealm,
            options.offset,
            options.payoutID,
            options.payoutToolType,
            options.excludedShops,
            options.continuationToken
        );
    }
}
