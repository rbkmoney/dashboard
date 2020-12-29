import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { pluck, take } from 'rxjs/operators';

import { PaymentInstitutionRealm } from '@dsh/api/model';
import { NotificationService } from '@dsh/app/shared/services';

import { PaymentsFiltersData } from './payments-filters/types/payments-filters-data';
import { FetchPaymentsService } from './services/fetch-payments/fetch-payments.service';
import { PaymentsExpandedIdManager } from './services/payments-expanded-id-manager/payments-expanded-id-manager.service';
import { Payment } from './types/payment';

@UntilDestroy()
@Component({
    selector: 'dsh-payments',
    templateUrl: 'payments.component.html',
})
export class PaymentsComponent implements OnInit {
    realm$: Observable<PaymentInstitutionRealm> = this.route.params.pipe(pluck('realm'), take(1));

    payments$: Observable<Payment[]> = this.fetchPayments.paymentsList$;
    isLoading$: Observable<boolean> = this.fetchPayments.isLoading$;
    hasMoreElements$: Observable<boolean> = this.fetchPayments.hasMore$;
    lastUpdated$: Observable<string> = this.fetchPayments.lastUpdated$;
    expandedId$: Observable<number> = this.expandedIdManager.expandedId$;

    constructor(
        private fetchPayments: FetchPaymentsService,
        private notificationService: NotificationService,
        private route: ActivatedRoute,
        private expandedIdManager: PaymentsExpandedIdManager
    ) {}

    ngOnInit(): void {
        this.realm$.subscribe((realm: PaymentInstitutionRealm) => {
            this.fetchPayments.initRealm(realm);
        });
        this.fetchPayments.errors$.pipe(untilDestroyed(this)).subscribe(() => {
            this.notificationService.error();
        });
    }

    refreshList(): void {
        this.fetchPayments.refresh();
    }

    requestNextPage(): void {
        this.fetchPayments.fetchMore();
    }

    filtersChanged(filtersData: PaymentsFiltersData): void {
        this.requestList(filtersData);
    }

    expandedIdChange(id: number): void {
        this.expandedIdManager.expandedIdChange(id);
    }

    private requestList({ daterange, shopIDs, invoiceIDs }: PaymentsFiltersData): void {
        this.fetchPayments.search({
            date: {
                begin: daterange.begin,
                end: daterange.end,
            },
            invoiceIDs,
            shopIDs,
        });
    }
}
