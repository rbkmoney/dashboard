import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { InvoiceSearchResult, SearchService } from '../api-codegen/capi/swagger-codegen';
import { genXRequestID } from '../api-codegen';
import { fakeDate } from './fake-date';
import { InvoicesSearchParams } from './invoices-search-params';
import { InvoicesWithToken } from './invoices-with-token';
import { Duration } from './duration';

@Injectable()
export class InvoiceSearchService {
    constructor(private searchService: SearchService) {}

    searchInvoices(
        fromTime: string,
        toTime: string,
        params: InvoicesSearchParams,
        limit: number,
        continuationToken?: string
    ): Observable<InvoicesWithToken> {
        return this.searchService.searchInvoices(
            genXRequestID(),
            fakeDate(fromTime),
            fakeDate(toTime),
            limit,
            undefined,
            params.shopID,
            params.invoiceStatus,
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
            params.bankCardTokenProvider,
            params.bankCardPaymentSystem,
            params.first6,
            params.last4,
            params.paymentAmount,
            params.invoiceAmount,
            params.excludedShops,
            undefined,
            continuationToken,
            undefined
        );
    }

    searchInvoicesByDuration(
        { amount, unit }: Duration,
        invoiceID: string,
        limit: number
    ): Observable<InvoicesWithToken> {
        const from = moment()
            .subtract(amount, unit)
            .startOf('d')
            .utc()
            .format();
        const to = moment()
            .endOf('d')
            .utc()
            .format();
        return this.searchInvoices(from, to, { invoiceID }, limit);
    }

    getInvoiceByDuration(duration: Duration, invoiceID: string): Observable<InvoiceSearchResult> {
        return this.searchInvoicesByDuration(duration, invoiceID, 1).pipe(map(res => res.result[0]));
    }
}
