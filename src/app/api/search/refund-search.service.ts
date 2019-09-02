import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import moment from 'moment';

import { RefundSearchResult, SearchService } from '../../api-codegen/capi/swagger-codegen';
import { RefundsWithToken } from './refunds-with-token';
import { fakeDate } from './fake-date';
import { Duration } from './duration';
import { genXRequestID } from '../gen-x-request-id';

@Injectable()
export class RefundSearchService {
    constructor(private searchService: SearchService) {}

    searchRefunds(
        fromTime: string,
        toTime: string,
        invoiceID: string,
        paymentID: string,
        limit: number,
        continuationToken?: string
    ): Observable<RefundsWithToken> {
        return this.searchService.searchRefunds(
            genXRequestID(),
            fakeDate(fromTime),
            fakeDate(toTime),
            limit,
            undefined,
            undefined,
            undefined,
            invoiceID,
            paymentID,
            undefined,
            undefined,
            undefined,
            continuationToken
        );
    }

    searchRefundsByDuration(
        { amount, unit }: Duration,
        invoiceID: string,
        paymentID: string,
        limit: number,
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
        return this.searchRefunds(from, to, invoiceID, paymentID, limit, continuationToken);
    }

    getRefundByDuration(duration: Duration, invoiceID: string, paymentID: string): Observable<RefundSearchResult> {
        return this.searchRefundsByDuration(duration, invoiceID, paymentID, 1).pipe(map(res => res.result[0]));
    }
}
