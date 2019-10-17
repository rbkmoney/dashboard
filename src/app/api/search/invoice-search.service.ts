import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { Invoice, SearchService } from '../../api-codegen/anapi/swagger-codegen';
import { toDateLike, genXRequestID } from '../utils';
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
        continuationToken?: string,
        excludedShops?: string[]
    ): Observable<InvoicesWithToken> {
        return this.searchService.searchInvoices(
            genXRequestID(),
            toDateLike(fromTime),
            toDateLike(toTime),
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
            params.rrn,
            params.paymentAmount,
            params.invoiceAmount,
            excludedShops,
            continuationToken
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

    getInvoiceByDuration(duration: Duration, invoiceID: string): Observable<Invoice> {
        return this.searchInvoicesByDuration(duration, invoiceID, 1).pipe(map(res => res.result[0]));
    }
}
