import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { PaymentSearchResult, SearchService } from '../api/capi/swagger-codegen';
import { genXRequestID } from '../api/gen-x-request-id';
import { PaymentsSearchParams } from './payments-search-params';
import { PaymentsWithToken } from './payments-with-token';
import { fakeDate } from './fake-date';

@Injectable()
export class PaymentSearchService {
    constructor(private searchService: SearchService) {}

    searchPayments(
        params: PaymentsSearchParams,
        limit: number,
        continuationToken?: string
    ): Observable<PaymentsWithToken> {
        return this.searchService.searchPayments(
            genXRequestID(),
            fakeDate(params.fromTime),
            fakeDate(params.toTime),
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
            params.excludedShops,
            continuationToken,
            undefined,
            undefined
        );
    }

    getPayment(
        fromTime: string,
        toTime: string,
        invoiceID: string,
        paymentID: string
    ): Observable<PaymentSearchResult> {
        return this.searchPayments(
            {
                fromTime,
                toTime,
                invoiceID,
                paymentID
            },
            1
        ).pipe(map(res => res.result[0]));
    }

    getPaymentByDuration(
        invoiceID: string,
        paymentID: string,
        amount: moment.DurationInputArg1,
        duration: moment.DurationInputArg2
    ): Observable<PaymentSearchResult> {
        const from = moment()
            .subtract(amount, duration)
            .startOf('d')
            .utc()
            .format();
        const to = moment()
            .endOf('d')
            .utc()
            .format();
        return this.getPayment(from, to, invoiceID, paymentID);
    }
}
