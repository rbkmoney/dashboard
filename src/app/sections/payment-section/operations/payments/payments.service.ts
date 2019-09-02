import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { PaymentSearchFormValue } from './search-form';
import { PaymentSearchService } from '../../../../api/search';
import { PaymentSearchResult } from '../../../../api-codegen/capi';
import { PartialFetcher, FetchResult } from '../../../partial-fetcher';
import { PaymentsTableData } from './table';
import { ShopService } from '../../../../api/shop';
import { mapToTimestamp } from '../operators';
import { mapToPaymentsTableData } from './map-to-payments-table-data';
import { getExcludedShopIDs } from '../get-excluded-shop-ids';

@Injectable()
export class PaymentsService extends PartialFetcher<PaymentSearchResult, PaymentSearchFormValue> {
    private readonly searchLimit = 20;

    lastUpdated$: Observable<string> = this.searchResult$.pipe(mapToTimestamp);

    paymentsTableData$: Observable<PaymentsTableData[]> = combineLatest(
        this.searchResult$,
        this.shopService.shops$
    ).pipe(mapToPaymentsTableData);

    constructor(
        private route: ActivatedRoute,
        private paymentSearchService: PaymentSearchService,
        private shopService: ShopService
    ) {
        super();
    }

    protected fetch(
        params: PaymentSearchFormValue,
        continuationToken: string
    ): Observable<FetchResult<PaymentSearchResult>> {
        return getExcludedShopIDs(this.route.params, this.shopService.shops$).pipe(
            switchMap(excludedShops =>
                this.paymentSearchService.searchPayments(
                    params.fromTime.utc().format(),
                    params.toTime.utc().format(),
                    params,
                    this.searchLimit,
                    continuationToken,
                    excludedShops
                )
            )
        );
    }
}
