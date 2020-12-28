import { Injectable } from '@angular/core';
import moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { InlineResponse2009, SearchService } from '@dsh/api-codegen/anapi';

import { genXRequestID, toDateLike } from '../utils';
import { Duration, InvoicesSearchParams } from './model';

@Injectable()
export class InvoiceSearchService {
    constructor(private searchService: SearchService) {}

    searchInvoices(
        fromTime: string,
        toTime: string,
        params: InvoicesSearchParams,
        limit: number,
        continuationToken?: string
    ): Observable<InlineResponse2009> {
        return this.searchService.searchInvoices(
            genXRequestID(),
            toDateLike(fromTime),
            toDateLike(toTime),
            limit,
            undefined,
            undefined,
            params.shopID,
            params.shopIDs,
            params.paymentInstitutionRealm,
            params.invoiceIDs,
            params.invoiceStatus,
            params.invoiceID,
            params.externalID,
            params.invoiceAmountFrom,
            params.invoiceAmountTo,
            params.excludedShops,
            continuationToken
        );
    }

    searchInvoicesByDuration({ amount, unit }: Duration, invoiceID: string, limit: number) {
        const from = moment().subtract(amount, unit).startOf('d').utc().format();
        const to = moment().endOf('d').utc().format();
        return this.searchInvoices(from, to, { invoiceID }, limit);
    }

    getInvoiceByDuration(duration: Duration, invoiceID: string) {
        return this.searchInvoicesByDuration(duration, invoiceID, 1).pipe(map((res) => res.result[0]));
    }
}
