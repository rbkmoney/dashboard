import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import moment from 'moment';

import { RefundsWithToken } from './refunds-with-token';
import { fakeDate } from './fake-date';
import { Duration } from './duration';
import { genXRequestID } from '../gen-x-request-id';
import { SearchService, Refund, RefundSearchResult } from '../../api-codegen/aapi/swagger-codegen';

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
    ): Observable<RefundsWithToken> {
        return this.searchService.searchRefunds(
            genXRequestID(),
            fakeDate(fromTime),
            fakeDate(toTime),
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
    ): Observable<RefundsWithToken> {
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

    getRefundByDuration(duration: Duration, invoiceID: string, paymentID: string): Observable<RefundSearchResult> {
        return this.searchRefundsByDuration(duration, invoiceID, paymentID, 1).pipe(map(res => res.result[0]));
    }
}
