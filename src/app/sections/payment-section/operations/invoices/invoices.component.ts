import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { pluck, shareReplay, take } from 'rxjs/operators';

import { SpinnerType } from '@dsh/components/indicators';

import { booleanDebounceTime, SHARE_REPLAY_CONF } from '../../../../custom-operators';
import { CreateInvoiceDialogComponent } from './create-invoice-dialog';
import { SearchFiltersParams } from './invoices-search-filters';
import { FetchInvoicesService } from './services/fetch-invoices/fetch-invoices.service';
import { InvoicesSearchFiltersStore } from './services/invoices-search-filters-store/invoices-search-filters-store.service';

@Component({
    selector: 'dsh-invoices',
    templateUrl: 'invoices.component.html',
    providers: [FetchInvoicesService, InvoicesSearchFiltersStore],
})
export class InvoicesComponent {
    tableData$ = this.invoicesService.invoicesTableData$;
    hasMoreInvoices$ = this.invoicesService.hasMore$;
    lastUpdated$ = this.invoicesService.lastUpdated$;
    doAction$ = this.invoicesService.doAction$;
    isLoading$ = this.doAction$.pipe(booleanDebounceTime(), shareReplay(SHARE_REPLAY_CONF));
    initSearchParams$ = this.refundsSearchFiltersStore.data$.pipe(take(1));
    spinnerType = SpinnerType.FulfillingBouncingCircle;

    realm$: Observable<string> = this.route.params.pipe(pluck('realm'), shareReplay(1));

    constructor(
        private invoicesService: FetchInvoicesService,
        private refundsSearchFiltersStore: InvoicesSearchFiltersStore,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService,
        private route: ActivatedRoute,
        private dialog: MatDialog
    ) {
        this.invoicesService.errors$.subscribe(() => this.snackBar.open(this.transloco.translate('commonError'), 'OK'));
    }

    updateSearchParams(p: SearchFiltersParams) {
        this.invoicesService.search(p);
        this.refundsSearchFiltersStore.preserve(p);
    }

    fetchMore() {
        this.invoicesService.fetchMore();
    }

    refresh() {
        this.invoicesService.refresh();
    }

    create() {
        this.dialog.open(CreateInvoiceDialogComponent, {
            width: '720px',
            maxHeight: '90vh',
            disableClose: true,
            data: {
                shops$: this.invoicesService.shops$,
            },
        });
    }
}
