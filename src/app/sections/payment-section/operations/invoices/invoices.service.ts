import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { combineLatest, Observable } from 'rxjs';
import { catchError, shareReplay, switchMap } from 'rxjs/operators';

import { Invoice } from '../../../../api-codegen/anapi';
import { InvoiceSearchService } from '../../../../api/search';
import { ShopService } from '../../../../api/shop';
import { booleanDebounceTime } from '../../../../custom-operators';
import { FetchResult, PartialFetcher } from '../../../partial-fetcher';
import { getExcludedShopIDs } from '../get-excluded-shop-ids';
import { mapToTimestamp } from '../operators';
import { mapToInvoicesTableData } from './map-to-invoices-table-data';
import { InvoiceSearchFormValue } from './search-form';
import { InvoicesTableData } from './table';

@Injectable()
export class InvoicesService extends PartialFetcher<Invoice, InvoiceSearchFormValue> {
    private readonly searchLimit = 20;

    lastUpdated$: Observable<string> = this.searchResult$.pipe(mapToTimestamp);

    invoicesTableData$: Observable<InvoicesTableData[]> = combineLatest(
        this.searchResult$,
        this.shopService.shops$
    ).pipe(
        mapToInvoicesTableData,
        catchError(() => {
            this.snackBar.open(this.transloco.translate('httpError'), 'OK');
            return [];
        })
    );

    isLoading$: Observable<boolean> = this.doAction$.pipe(
        booleanDebounceTime(),
        shareReplay(1)
    );

    constructor(
        private route: ActivatedRoute,
        private invoiceSearchService: InvoiceSearchService,
        private shopService: ShopService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        super();
    }

    protected fetch(params: InvoiceSearchFormValue, continuationToken: string): Observable<FetchResult<Invoice>> {
        return getExcludedShopIDs(this.route.params, this.shopService.shops$).pipe(
            switchMap(excludedShops =>
                this.invoiceSearchService.searchInvoices(
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
