import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { pluck, shareReplay, take } from 'rxjs/operators';

import { PaymentInstitutionRealm } from '@dsh/api/model';
import { SpinnerType } from '@dsh/components/indicators';

import { CreateInvoiceService } from './create-invoice';
import { SearchFiltersParams } from './invoices-search-filters';
import { FetchInvoicesService } from './services/fetch-invoices/fetch-invoices.service';
import { InvoicesExpandedIdManager } from './services/invoices-expanded-id-manager/invoices-expanded-id-manager.service';
import { InvoicesSearchFiltersStore } from './services/invoices-search-filters-store/invoices-search-filters-store.service';

@UntilDestroy()
@Component({
    selector: 'dsh-invoices',
    templateUrl: 'invoices.component.html',
    providers: [FetchInvoicesService, InvoicesSearchFiltersStore, InvoicesExpandedIdManager],
})
export class InvoicesComponent implements OnInit {
    invoices$ = this.invoicesService.searchResult$;
    hasMore$ = this.invoicesService.hasMore$;
    lastUpdated$ = this.invoicesService.lastUpdated$;
    isLoading$ = this.invoicesService.isLoading$;
    expandedId$ = this.invoicesExpandedIdManager.expandedId$;
    initSearchParams$ = this.invoicesSearchFiltersStore.data$.pipe(take(1));
    fetchErrors$ = this.invoicesService.errors$;
    spinnerType = SpinnerType.FulfillingBouncingCircle;

    realm$: Observable<PaymentInstitutionRealm> = this.route.params.pipe(pluck('realm'), shareReplay(1));

    constructor(
        private invoicesService: FetchInvoicesService,
        private createInvoiceService: CreateInvoiceService,
        private invoicesSearchFiltersStore: InvoicesSearchFiltersStore,
        private invoicesExpandedIdManager: InvoicesExpandedIdManager,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.invoicesService.errors$
            .pipe(untilDestroyed(this))
            .subscribe(() => this.snackBar.open(this.transloco.translate('commonError'), 'OK'));
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
        this.route.params.pipe(pluck('realm'), take(1)).subscribe((realm: PaymentInstitutionRealm) =>
            this.createInvoiceService
                .createInvoice(realm)
                .pipe(untilDestroyed(this))
                .subscribe((invoiceID) => this.refreshAndShowNewInvoice(invoiceID))
        );
    }

    refreshAndShowNewInvoice(invoiceID: string) {
        this.refresh();
        // TODO: open created invoice panel
        // this.invoices$.pipe(take(1), map(invoices => invoices.findIndex((invoice) => invoice.id === invoiceID))).subscribe((id) => {
        //     this.expandedIdChange(id)
        // });
    }
}
