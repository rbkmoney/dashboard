import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import moment from 'moment';

import { SearchService } from '../../api-codegen/anapi/swagger-codegen';
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
        continuationToken?: string,
        excludedShops?: string[]
    ) {
        return this.searchService.searchInvoices(
            genXRequestID(),
            toDateLike(fromTime),
            toDateLike(toTime),
            limit,
            undefined,
            params.shopID,
            params.invoiceStatus,
            params.invoiceID,
            params.invoiceAmountFrom,
            params.invoiceAmountTo,
            excludedShops,
            continuationToken
        );
    }

    searchInvoicesByDuration({ amount, unit }: Duration, invoiceID: string, limit: number) {
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

    getInvoiceByDuration(duration: Duration, invoiceID: string) {
        return this.searchInvoicesByDuration(duration, invoiceID, 1).pipe(map(res => res.result[0]));
    }
}
