import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { combineLatest, Observable } from 'rxjs';
import { catchError, pluck, switchMap } from 'rxjs/operators';

import { PaymentSearchResult } from '../../../../api-codegen/capi';
import { PaymentSearchService } from '../../../../api/search';
import { ShopService } from '../../../../api/shop';
import { FetchResult, PartialFetcher } from '../../../partial-fetcher';
import { getShopSearchParamsByEnv } from '../get-shop-search-params-by-env';
import { mapToTimestamp } from '../operators';
import { mapToPaymentsTableData } from './map-to-payments-table-data';
import { PaymentSearchFormValue } from './search-form';
import { PaymentsTableData } from './table';

@Injectable()
export class PaymentsService extends PartialFetcher<PaymentSearchResult, PaymentSearchFormValue> {
    private readonly searchLimit = 20;

    lastUpdated$: Observable<string> = this.searchResult$.pipe(mapToTimestamp);

    paymentsTableData$: Observable<PaymentsTableData[]> = combineLatest([
        this.searchResult$,
        this.shopService.shops$,
    ]).pipe(
        mapToPaymentsTableData,
        catchError(() => {
            this.snackBar.open(this.transloco.translate('httpError'), 'OK');
            return [];
        })
    );

    constructor(
        private route: ActivatedRoute,
        private paymentSearchService: PaymentSearchService,
        private shopService: ShopService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        super();
    }

    protected fetch(
        params: PaymentSearchFormValue,
        continuationToken: string
    ): Observable<FetchResult<PaymentSearchResult>> {
        return this.route.params.pipe(
            pluck('envID'),
            getShopSearchParamsByEnv(this.shopService.shops$),
            switchMap(({ excludedShops, shopIDs }) =>
                this.paymentSearchService.searchPayments(
                    params.date.begin.utc().format(),
                    params.date.end.utc().format(),
                    { ...params, shopIDs: shopIDs ? shopIDs : params.shopIDs },
                    this.searchLimit,
                    continuationToken,
                    excludedShops
                )
            )
        );
    }
}
