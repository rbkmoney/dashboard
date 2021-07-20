import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';

import { PaymentSearchResult } from '@dsh/api-codegen/anapi';
import { QueryParamsService } from '@dsh/app/shared/services/query-params/query-params.service';

import { PaymentInstitutionRealmService } from '../../services/payment-institution-realm/payment-institution-realm.service';
import { Filters } from './payments-filters';
import { FetchPaymentsService } from './services/fetch-payments/fetch-payments.service';
import { PaymentsExpandedIdManager } from './services/payments-expanded-id-manager/payments-expanded-id-manager.service';
import { PaymentSearchFormValue } from './types/payment-search-form-value';

@UntilDestroy()
@Component({
    selector: 'dsh-payments',
    templateUrl: 'payments.component.html',
    providers: [FetchPaymentsService, PaymentsExpandedIdManager],
})
export class PaymentsComponent {
    realm$ = this.paymentInstitutionRealmService.realm$;
    payments$: Observable<PaymentSearchResult[]> = this.paymentsService.paymentsList$;
    isLoading$: Observable<boolean> = this.paymentsService.isLoading$;
    hasMoreElements$: Observable<boolean> = this.paymentsService.hasMore$;
    lastUpdated$: Observable<string> = this.paymentsService.lastUpdated$;
    expandedId$: Observable<number> = this.expandedIdManager.expandedId$;
    initParams$ = this.qp.params$;

    constructor(
        private paymentsService: FetchPaymentsService,
        private route: ActivatedRoute,
        private expandedIdManager: PaymentsExpandedIdManager,
        private paymentInstitutionRealmService: PaymentInstitutionRealmService,
        private qp: QueryParamsService<Filters>
    ) {}

    refreshList(): void {
        this.paymentsService.refresh();
    }

    requestNextPage(): void {
        this.paymentsService.fetchMore();
    }

    filtersChanged(filters: Filters): void {
        void this.qp.set(filters);
        // TODO: refactor additional filters
        const { dateRange, binPan, ...otherFilters } = filters;
        const paymentMethod: Partial<PaymentSearchFormValue> =
            binPan?.bin || binPan?.pan ? { paymentMethod: 'bankCard' } : {};
        if (binPan?.bin) paymentMethod.first6 = binPan.bin;
        if (binPan?.pan) paymentMethod.last4 = binPan.pan;
        this.paymentsService.search({
            ...otherFilters,
            ...paymentMethod,
            fromTime: dateRange.start.utc().format(),
            toTime: dateRange.end.utc().format(),
            realm: this.paymentInstitutionRealmService.realm,
        });
    }

    expandedIdChange(id: number): void {
        this.expandedIdManager.expandedIdChange(id);
    }
}
