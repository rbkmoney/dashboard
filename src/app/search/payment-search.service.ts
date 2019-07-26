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

    getPayments = (paymentsSearchParams: PaymentsSearchParams): Observable<PaymentsWithToken> =>
        this.searchService.searchPayments(
            genXRequestID(),
            paymentsSearchParams.fromTime,
            paymentsSearchParams.toTime,
            paymentsSearchParams.limit,
            paymentsSearchParams.xRequestDeadline,
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
            paymentsSearchParams.bin,
            paymentsSearchParams.lastDigits,
            paymentsSearchParams.bankCardTokenProvider,
            paymentsSearchParams.bankCardPaymentSystem,
            paymentsSearchParams.paymentAmount,
            paymentsSearchParams.continuationToken,
            paymentsSearchParams.observe,
            paymentsSearchParams.reportProgress
        );

    getPayment = (invoiceID: string, paymentID: string): Observable<PaymentSearchResult> =>
        this.getPayments({
            xRequestID: genXRequestID(),
            fromTime: moment().subtract(1, 'year') as any,
            toTime: moment() as any,
            limit: 1,
            invoiceID,
            paymentID
        }).pipe(map(res => res.result[0]));
}
