import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetchResult, PartialFetcher } from '@rbkmoney/partial-fetcher';
import { Observable } from 'rxjs';
import { pluck, shareReplay, switchMap } from 'rxjs/operators';

import { Invoice } from '@dsh/api-codegen/anapi';
import { InvoiceSearchService } from '@dsh/api/search';

import { booleanDebounceTime, mapToTimestamp } from '../../../../../../custom-operators';
import { SEARCH_LIMIT } from '../../../../../tokens';
import { SearchFiltersParams } from '../../invoices-search-filters';

@Injectable()
export class FetchInvoicesService extends PartialFetcher<Invoice, SearchFiltersParams> {
    isLoading$: Observable<boolean> = this.doAction$.pipe(booleanDebounceTime(), shareReplay(1));
    lastUpdated$: Observable<string> = this.searchResult$.pipe(mapToTimestamp);

    constructor(
        private route: ActivatedRoute,
        private invoiceSearchService: InvoiceSearchService,
        @Inject(SEARCH_LIMIT)
        private searchLimit: number
    ) {
        super();
    }

    protected fetch(
        { fromTime, toTime, ...params }: SearchFiltersParams,
        continuationToken: string
    ): Observable<FetchResult<Invoice>> {
        return this.route.params.pipe(
            pluck('realm'),
            switchMap((paymentInstitutionRealm) =>
                this.invoiceSearchService.searchInvoices(
                    fromTime,
                    toTime,
                    {
                        ...params,
                        paymentInstitutionRealm,
                    },
                    this.searchLimit,
                    continuationToken
                )
            )
        );
    }
}
