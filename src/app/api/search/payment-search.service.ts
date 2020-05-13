import { Injectable } from '@angular/core';
import moment from 'moment';
import { map } from 'rxjs/operators';

import { SearchService } from '../../api-codegen/anapi/swagger-codegen';
import { genXRequestID, toDateLike } from '../utils';
import { Duration, PaymentsSearchParams } from './model';

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
    ) {
        return this.searchService.searchPayments(
            genXRequestID(),
            toDateLike(fromTime),
            toDateLike(toTime),
            limit,
            undefined,
            params.shopID,
            params.shopIDs,
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
            params.paymentAmountFrom,
            params.paymentAmountTo,
            excludedShops,
            continuationToken
        );
    }

    searchPaymentsByDuration(
        { amount, unit }: Duration,
        params: PaymentsSearchParams,
        limit: number,
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
        return this.searchPayments(from, to, params, limit, continuationToken);
    }

    getPaymentByDuration(duration: Duration, invoiceID: string, paymentID: string) {
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
