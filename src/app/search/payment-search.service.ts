import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import moment from 'moment';
import { map } from 'rxjs/operators';

import { PaymentSearchResult, SearchService } from '../api/capi/swagger-codegen';
import { genXRequestID } from '../api/gen-x-request-id';
import { PaymentsSearchParams } from './payments-search-params';
import { PaymentsWithToken } from './payments-with-token';

@Injectable()
export class PaymentSearchService {
    constructor(private searchService: SearchService) {}

    getPayments(
        paymentsSearchParams: PaymentsSearchParams,
        limit = 20,
        fromTime = moment().subtract(1, 'M') as any,
        toTime = moment() as any,
        continuationToken?: string
    ): Observable<PaymentsWithToken> {
        return this.searchService.searchPayments(
            genXRequestID(),
            fromTime,
            toTime,
            limit,
            undefined,
            paymentsSearchParams.shopID,
            paymentsSearchParams.paymentStatus,
            paymentsSearchParams.paymentFlow,
            paymentsSearchParams.paymentMethod,
            paymentsSearchParams.paymentTerminalProvider,
            paymentsSearchParams.invoiceID,
            paymentsSearchParams.paymentID,
            paymentsSearchParams.payerEmail,
            paymentsSearchParams.payerIP,
            paymentsSearchParams.payerFingerprint,
            paymentsSearchParams.customerID,
            paymentsSearchParams.first6,
            paymentsSearchParams.last4,
            paymentsSearchParams.rrn,
            paymentsSearchParams.approvalCode,
            paymentsSearchParams.bankCardTokenProvider,
            paymentsSearchParams.bankCardPaymentSystem,
            paymentsSearchParams.paymentAmount,
            continuationToken,
            undefined,
            undefined
        );
    }

    getPayment(invoiceID: string, paymentID: string): Observable<PaymentSearchResult> {
        return this.getPayments(
            {
                invoiceID,
                paymentID
            },
            20
        ).pipe(map(res => res.result[0]));
    }
}
