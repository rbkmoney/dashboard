import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { combineLatest, Observable } from 'rxjs';
import { catchError, pluck, shareReplay, switchMap } from 'rxjs/operators';

import { InvoiceSearchService } from '../../../../api';
import { Invoice } from '../../../../api-codegen/anapi';
import { Shop } from '../../../../api-codegen/capi';
import { ShopService } from '../../../../api/shop';
import { SHARE_REPLAY_CONF } from '../../../../custom-operators';
import { FetchResult, PartialFetcher } from '../../../partial-fetcher';
import { filterShopsByEnv, mapToTimestamp } from '../operators';
import { mapToInvoicesTableData } from './map-to-invoices-table-data';
import { InvoiceSearchFormValue } from './search-form';
import { InvoicesTableData } from './table';

@Injectable()
export class InvoicesService extends PartialFetcher<Invoice, InvoiceSearchFormValue> {
    private readonly searchLimit = 20;

    lastUpdated$: Observable<string> = this.searchResult$.pipe(mapToTimestamp);

    invoicesTableData$: Observable<InvoicesTableData[]> = combineLatest([
        this.searchResult$,
        this.shopService.shops$,
    ]).pipe(
        mapToInvoicesTableData,
        catchError(() => {
            this.snackBar.open(this.transloco.translate('httpError'), 'OK');
            return [];
        })
    );

    shops$: Observable<Shop[]> = this.route.params.pipe(
        pluck('realm'),
        filterShopsByEnv(this.shopService.shops$),
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
        return this.route.params.pipe(
            pluck('realm'),
            switchMap((paymentInstitutionRealm) =>
                this.invoiceSearchService.searchInvoices(
                    params.date.begin.utc().format(),
                    params.date.end.utc().format(),
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
