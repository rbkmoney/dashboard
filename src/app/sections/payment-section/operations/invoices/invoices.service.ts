import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { combineLatest, Observable } from 'rxjs';
import { catchError, pluck, shareReplay, switchMap } from 'rxjs/operators';

import { InvoiceSearchService } from '../../../../api';
import { Invoice } from '../../../../api-codegen/anapi';
import { ShopService } from '../../../../api/shop';
import { SHARE_REPLAY_CONF } from '../../../../custom-operators';
import { FetchResult, PartialFetcher } from '../../../partial-fetcher';
import { getExcludedShopIDs } from '../get-excluded-shop-ids';
import { filterShopsByEnv, mapToShopInfo, mapToTimestamp, ShopInfo } from '../operators';
import { mapToInvoicesTableData } from './map-to-invoices-table-data';
import { InvoiceSearchFormValue } from './search-form';
import { InvoicesTableData } from './table';

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

    shopsInfo$: Observable<ShopInfo[]> = this.route.params.pipe(
        pluck('envID'),
        filterShopsByEnv(this.shopService.shops$),
        mapToShopInfo,
        shareReplay(SHARE_REPLAY_CONF)
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
                    params.date.begin.utc().format(),
                    params.date.end.utc().format(),
                    params,
                    this.searchLimit,
                    continuationToken,
                    excludedShops
                )
            )
        );
    }
}
