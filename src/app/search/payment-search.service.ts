import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import moment from 'moment';
import { map } from 'rxjs/operators';

import { PaymentSearchResult, SearchService } from '../api/capi/swagger-codegen';
import { genXRequestID } from '../api/gen-x-request-id';
import { PaymentsSearchParams } from './payments-search-params';
import { PaymentsWithToken } from './payments-with-token';
import { fakeDate } from './fake-date';

@Injectable()
export class PaymentSearchService {
    constructor(private searchService: SearchService) {}

    searchPayments(
        {
            xRequestID = genXRequestID(),
            limit = 20,
            fromTime = moment().subtract(1, 'M').utc().format(),
            toTime = moment().utc().format(),
            ...params
        }: PaymentsSearchParams
    ): Observable<PaymentsWithToken> {
        return this.searchService.searchPayments(
            xRequestID,
            fakeDate(fromTime),
            fakeDate(toTime),
            limit,
            params.xRequestDeadline,
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
            params.continuationToken,
            undefined,
            undefined
        );
    }

    getPayment(invoiceID: string, paymentID: string): Observable<PaymentSearchResult> {
        return this.searchPayments(
            {
                invoiceID,
                paymentID,
                limit: 1
            }
        ).pipe(map(res => res.result[0]));
    }
}
