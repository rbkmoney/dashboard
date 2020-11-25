import { Injectable } from '@angular/core';
import moment from 'moment';
import { map } from 'rxjs/operators';

import { SearchService } from '../../api-codegen/anapi/swagger-codegen';
import { genXRequestID, toDateLike } from '../utils';
import { Duration, RefundsSearchParams } from './model';

@Injectable()
export class RefundSearchService {
    constructor(private searchService: SearchService) {}

    searchRefunds(
        fromTime: string,
        toTime: string,
        params: RefundsSearchParams,
        limit: number,
        continuationToken?: string
    ) {
        return this.searchService.searchRefunds(
            genXRequestID(),
            toDateLike(fromTime),
            toDateLike(toTime),
            limit,
            undefined,
            undefined,
            params.shopID,
            params.shopIDs,
            params.paymentInstitutionRealm,
            undefined,
            params.invoiceIDs,
            params.invoiceID,
            params.paymentID,
            params.refundID,
            params.externalID,
            params.refundStatus,
            params.excludedShops,
            continuationToken
        );
    }

    searchRefundsByDuration(
        { amount, unit }: Duration,
        params: RefundsSearchParams,
        limit?: number,
        continuationToken?: string
    ) {
        const from = moment().subtract(amount, unit).startOf('d').utc().format();
        const to = moment().endOf('d').utc().format();
        return this.searchRefunds(from, to, params, limit, continuationToken);
    }

    getRefundByDuration(duration: Duration, invoiceID: string, paymentID: string) {
        return this.searchRefundsByDuration(duration, { invoiceID, paymentID }, 1).pipe(map((res) => res.result[0]));
    }
}
