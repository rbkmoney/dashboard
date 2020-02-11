import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, combineLatest } from 'rxjs';
import { switchMap, catchError, shareReplay } from 'rxjs/operators';
import { TranslocoService } from '@ngneat/transloco';

import { InvoiceSearchFormValue } from './search-form';
import { InvoiceSearchService } from '../../../../api/search';
import { Invoice } from '../../../../api-codegen/anapi';
import { PartialFetcher, FetchResult } from '../../../partial-fetcher';
import { InvoicesTableData } from './table';
import { ShopService } from '../../../../api/shop';
import { mapToTimestamp } from '../operators';
import { getExcludedShopIDs } from '../get-excluded-shop-ids';
import { booleanDebounceTime } from '../../../../custom-operators';
import { mapToInvoicesTableData } from './map-to-invoices-table-data';

@Injectable()
export class InvoicesService extends PartialFetcher<Invoice, InvoiceSearchFormValue> {
    private readonly searchLimit = 20;

    lastUpdated$: Observable<string> = this.searchResult$.pipe(mapToTimestamp);

    invoicesTableData$: Observable<InvoicesTableData[]> = combineLatest([
        this.searchResult$,
        this.shopService.shops$
    ]).pipe(
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
