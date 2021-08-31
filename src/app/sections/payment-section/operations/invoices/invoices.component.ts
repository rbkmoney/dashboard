import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { take } from 'rxjs/operators';

import { QueryParamsService } from '@dsh/app/shared/services/query-params/query-params.service';
import { SpinnerType } from '@dsh/components/indicators';

import { RealmMixinService, PaymentInstitutionRealmService } from '../../services';
import { CreateInvoiceService } from './create-invoice';
import { Filters, SearchFiltersParams } from './invoices-search-filters';
import { FetchInvoicesService } from './services/fetch-invoices/fetch-invoices.service';
import { InvoicesExpandedIdManager } from './services/invoices-expanded-id-manager/invoices-expanded-id-manager.service';

@UntilDestroy()
@Component({
    selector: 'dsh-invoices',
    templateUrl: 'invoices.component.html',
    providers: [FetchInvoicesService, InvoicesExpandedIdManager, RealmMixinService],
})
export class InvoicesComponent implements OnInit {
    invoices$ = this.invoicesService.searchResult$;
    hasMore$ = this.invoicesService.hasMore$;
    lastUpdated$ = this.invoicesService.lastUpdated$;
    isLoading$ = this.invoicesService.isLoading$;
    expandedId$ = this.invoicesExpandedIdManager.expandedId$;
    fetchErrors$ = this.invoicesService.errors$;
    spinnerType = SpinnerType.FulfillingBouncingCircle;
    realm$ = this.paymentInstitutionRealmService.realm$;
    params$ = this.qp.params$;

    constructor(
        private invoicesService: FetchInvoicesService,
        private createInvoiceService: CreateInvoiceService,
        private invoicesExpandedIdManager: InvoicesExpandedIdManager,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService,
        private paymentInstitutionRealmService: PaymentInstitutionRealmService,
        private qp: QueryParamsService<Filters>,
        private realmMixinService: RealmMixinService<SearchFiltersParams>
    ) {}

    ngOnInit(): void {
        this.invoicesService.errors$
            .pipe(untilDestroyed(this))
            .subscribe(() => this.snackBar.open(this.transloco.translate('commonError'), 'OK'));

        this.realmMixinService.valueAndRealm$
            .pipe(untilDestroyed(this))
            .subscribe((v) => this.invoicesService.search(v));
    }

    searchParamsChanges(p: Filters): void {
        void this.qp.set(p);
        const { dateRange, ...otherFilters } = p;
        this.realmMixinService.valueChange({
            ...otherFilters,
            fromTime: dateRange.start.utc().format(),
            toTime: dateRange.end.utc().format(),
            realm: null,
        });
    }

    expandedIdChange(id: number): void {
        this.invoicesExpandedIdManager.expandedIdChange(id);
    }

    fetchMore(): void {
        this.invoicesService.fetchMore();
    }

    refresh(): void {
        this.invoicesService.refresh();
    }

    create(): void {
        this.paymentInstitutionRealmService.realm$.pipe(take(1)).subscribe((realm) =>
            this.createInvoiceService
                .createInvoice(realm)
                .pipe(untilDestroyed(this))
                .subscribe((invoiceID) => this.refreshAndShowNewInvoice(invoiceID))
        );
    }

    refreshAndShowNewInvoice(_invoiceID: string): void {
        this.refresh();
    }
}
