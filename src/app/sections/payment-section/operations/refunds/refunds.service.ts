import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { RefundSearchResult } from '../../../../api-codegen/capi';
import { RefundSearchService } from '../../../../api/search';
import { ShopService } from '../../../../api/shop';
import { FetchResult, PartialFetcher } from '../../../partial-fetcher';
import { getExcludedShopIDs } from '../get-excluded-shop-ids';
import { mapToTimestamp } from '../operators';
import { RefundsSearchFormValue } from './search-form';
import { RefundsTableData } from './table';

@Injectable()
export class RefundsService extends PartialFetcher<RefundSearchResult, RefundsSearchFormValue> {
    private readonly searchLimit = 20;

    lastUpdated$: Observable<string> = this.searchResult$.pipe(mapToTimestamp);

    refundsTableData$: Observable<RefundsTableData[]> = this.searchResult$.pipe(
        catchError(() => {
            this.snackBar.open(this.transloco.translate('httpError'), 'OK');
            return [];
        })
    );

    constructor(
        private route: ActivatedRoute,
        private refundSearchService: RefundSearchService,
        private snackBar: MatSnackBar,
        private shopService: ShopService,
        private transloco: TranslocoService
    ) {
        super();
    }

    protected fetch(
        params: RefundsSearchFormValue,
        continuationToken: string
    ): Observable<FetchResult<RefundSearchResult>> {
        return getExcludedShopIDs(this.route.params, this.shopService.shops$).pipe(
            switchMap(excludedShops =>
                this.refundSearchService.searchRefunds(
                    params.date.begin.utc().format(),
                    params.date.end.utc().format(),
                    params.invoiceID,
                    params.paymentID,
                    this.searchLimit,
                    params.shopID,
                    params.refundID,
                    params.refundStatus,
                    excludedShops,
                    continuationToken
                )
            )
        );
    }
}
