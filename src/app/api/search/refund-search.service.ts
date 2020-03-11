import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import moment from 'moment';

import { toDateLike, genXRequestID } from '../utils';
import { Duration } from './model';
import { SearchService, Refund } from '../../api-codegen/anapi/swagger-codegen';

@Injectable()
export class RefundSearchService {
    constructor(private searchService: SearchService) {}

    searchRefunds(
        fromTime: string,
        toTime: string,
        invoiceID: string,
        paymentID: string,
        limit: number,
        shopID: string,
        refundID: string,
        refundStatus: Refund.StatusEnum,
        excludedShops: string[],
        continuationToken?: string
    ) {
        return this.searchService.searchRefunds(
            genXRequestID(),
            toDateLike(fromTime),
            toDateLike(toTime),
            limit,
            undefined,
            shopID,
            undefined,
            invoiceID,
            paymentID,
            refundID,
            refundStatus,
            excludedShops,
            continuationToken
        );
    }

    searchRefundsByDuration(
        { amount, unit }: Duration,
        invoiceID: string,
        paymentID: string,
        limit?: number,
        shopID?: string,
        refundID?: string,
        refundStatus?: Refund.StatusEnum,
        excludedShops?: string[],
        continuationToken?: string
    ) {
        const from = moment()
            .subtract(amount, unit)
            .startOf('d')
            .utc()
            .format();
        const to = moment()
            .endOf('d')
            .utc()
            .format();
        return this.searchRefunds(
            from,
            to,
            invoiceID,
            paymentID,
            limit,
            shopID,
            refundID,
            refundStatus,
            excludedShops,
            continuationToken
        );
    }

    getRefundByDuration(duration: Duration, invoiceID: string, paymentID: string) {
        return this.searchRefundsByDuration(duration, invoiceID, paymentID, 1).pipe(map(res => res.result[0]));
    }
}
