import { Inject, Injectable } from '@angular/core';
import { FetchResult, PartialFetcher } from '@rbkmoney/partial-fetcher';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { Invoice } from '@dsh/api-codegen/anapi';
import { InvoiceSearchService } from '@dsh/api/search';
import { booleanDebounceTime, mapToTimestamp } from '@dsh/operators';

import { SEARCH_LIMIT } from '../../../../../tokens';
import { SearchFiltersParams } from '../../invoices-search-filters';

@Injectable()
export class FetchInvoicesService extends PartialFetcher<Invoice, SearchFiltersParams> {
    isLoading$: Observable<boolean> = this.doAction$.pipe(booleanDebounceTime(), shareReplay(1));
    lastUpdated$: Observable<string> = this.searchResult$.pipe(mapToTimestamp);

    constructor(
        private invoiceSearchService: InvoiceSearchService,
        @Inject(SEARCH_LIMIT)
        private searchLimit: number
    ) {
        super();
    }

    protected fetch(
        { fromTime, toTime, realm, ...params }: SearchFiltersParams,
        continuationToken: string
    ): Observable<FetchResult<Invoice>> {
        return this.invoiceSearchService.searchInvoices(
            fromTime,
            toTime,
            {
                ...params,
                paymentInstitutionRealm: realm,
            },
            this.searchLimit,
            continuationToken
        );
    }
}
