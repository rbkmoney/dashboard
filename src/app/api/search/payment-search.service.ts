import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { PaymentSearchResult, SearchService } from '../../api-codegen/anapi/swagger-codegen';
import { PaymentsSearchParams } from './payments-search-params';
import { PaymentsWithToken } from './payments-with-token';
import { fakeDate } from './fake-date';
import { Duration } from './duration';
import { genXRequestID } from '../gen-x-request-id';

@Injectable()
export class PaymentSearchService {
    constructor(private searchService: SearchService) {}

    searchPayments(
        fromTime: string,
        toTime: string,
        params: PaymentsSearchParams,
        limit: number,
        continuationToken?: string,
        excludedShops?: string[]
    ): Observable<PaymentsWithToken> {
        return this.searchService.searchPayments(
            genXRequestID(),
            fakeDate(fromTime),
            fakeDate(toTime),
            limit,
            undefined,
            params.shopID,
            params.paymentStatus,
            params.paymentFlow,
            params.paymentMethod,
            params.paymentTerminalProvider,
            params.invoiceID,
            params.paymentID,
            params.payerEmail,
            params.payerIP,
            params.payerFingerprint,
            params.customerID,
            params.first6,
            params.last4,
            params.rrn,
            params.approvalCode,
            params.bankCardTokenProvider,
            params.bankCardPaymentSystem,
            params.paymentAmount,
            excludedShops,
            continuationToken,
            undefined,
            undefined
        );
    }

    searchPaymentsByDuration(
        { amount, unit }: Duration,
        params: PaymentsSearchParams,
        limit: number,
        continuationToken?: string
    ): Observable<PaymentsWithToken> {
        const from = moment()
            .subtract(amount, unit)
            .startOf('d')
            .utc()
            .format();
        const to = moment()
            .endOf('d')
            .utc()
            .format();
        return this.searchPayments(from, to, params, limit, continuationToken);
    }

    getPaymentByDuration(duration: Duration, invoiceID: string, paymentID: string): Observable<PaymentSearchResult> {
        return this.searchPaymentsByDuration(
            duration,
            {
                invoiceID,
                paymentID
            },
            1
        ).pipe(map(({ result }) => result[0]));
    }
}
