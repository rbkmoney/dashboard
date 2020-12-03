import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { pluck, shareReplay, take } from 'rxjs/operators';

import { SpinnerType } from '@dsh/components/indicators';

import { Shop } from '../../../../api-codegen/capi/swagger-codegen';
import { PaymentInstitutionRealm } from '../../../../api/model';
import { ApiShopsService } from '../../../../api/shop';
import { SHARE_REPLAY_CONF } from '../../../../custom-operators';
import { filterShopsByRealm } from '../operators';
import { CreateInvoiceDialogComponent } from './create-invoice-dialog';
import { SearchFiltersParams } from './invoices-search-filters';
import { FetchInvoicesService } from './services/fetch-invoices/fetch-invoices.service';
import { InvoicesExpandedIdManager } from './services/invoices-expanded-id-manager/invoices-expanded-id-manager.service';
import { InvoicesSearchFiltersStore } from './services/invoices-search-filters-store/invoices-search-filters-store.service';

@Component({
    selector: 'dsh-invoices',
    templateUrl: 'invoices.component.html',
    providers: [FetchInvoicesService, InvoicesSearchFiltersStore, InvoicesExpandedIdManager],
})
export class InvoicesComponent {
    invoices$ = this.invoicesService.searchResult$;
    hasMore$ = this.invoicesService.hasMore$;
    lastUpdated$ = this.invoicesService.lastUpdated$;
    isLoading$ = this.invoicesService.isLoading$;
    expandedId$ = this.invoicesExpandedIdManager.expandedId$;
    initSearchParams$ = this.invoicesSearchFiltersStore.data$.pipe(take(1));
    fetchErrors$ = this.invoicesService.errors$;
    spinnerType = SpinnerType.FulfillingBouncingCircle;

    realm$: Observable<PaymentInstitutionRealm> = this.route.params.pipe(pluck('realm'), shareReplay(1));
    // temporary variable to keep the logic working
    shops$: Observable<Shop[]> = this.realm$.pipe(
        filterShopsByRealm(this.apiShopsService.shops$),
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(
        private invoicesService: FetchInvoicesService,
        private apiShopsService: ApiShopsService,
        private invoicesSearchFiltersStore: InvoicesSearchFiltersStore,
        private invoicesExpandedIdManager: InvoicesExpandedIdManager,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService,
        private route: ActivatedRoute,
        private dialog: MatDialog
    ) {
        this.invoicesService.errors$.subscribe(() => this.snackBar.open(this.transloco.translate('commonError'), 'OK'));
    }

    searchParamsChanges(p: SearchFiltersParams) {
        this.invoicesService.search(p);
        this.invoicesSearchFiltersStore.preserve(p);
    }

    expandedIdChange(id: number) {
        this.invoicesExpandedIdManager.expandedIdChange(id);
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
                shops$: this.shops$,
            },
        });
    }
}
