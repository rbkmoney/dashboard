import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck, shareReplay, switchMap } from 'rxjs/operators';

import { InvoiceSearchService } from '@dsh/api/search';

import { Invoice } from '../../../../../../api-codegen/anapi';
import { booleanDebounceTime } from '../../../../../../custom-operators';
import { SEARCH_LIMIT } from '../../../../../constants';
import { FetchResult, PartialFetcher } from '../../../../../partial-fetcher';
import { mapToTimestamp } from '../../../operators';
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

    protected fetch(params: SearchFiltersParams, continuationToken: string): Observable<FetchResult<Invoice>> {
        return this.route.params.pipe(
            pluck('realm'),
            switchMap((paymentInstitutionRealm) =>
                this.invoiceSearchService.searchInvoices(
                    params.fromTime,
                    params.toTime,
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
