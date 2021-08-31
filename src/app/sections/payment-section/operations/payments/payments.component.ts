import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';

import { PaymentSearchResult } from '@dsh/api-codegen/anapi';
import { QueryParamsService } from '@dsh/app/shared/services';

import { PaymentInstitutionRealmService, RealmMixinService } from '../../services';
import { Filters } from './payments-filters';
import { PaymentsExpandedIdManager, FetchPaymentsService } from './services';
import { PaymentSearchFormValue } from './types';

@UntilDestroy()
@Component({
    selector: 'dsh-payments',
    templateUrl: 'payments.component.html',
    providers: [FetchPaymentsService, PaymentsExpandedIdManager, RealmMixinService],
})
export class PaymentsComponent implements OnInit {
    realm$ = this.paymentInstitutionRealmService.realm$;
    payments$: Observable<PaymentSearchResult[]> = this.paymentsService.paymentsList$;
    isLoading$: Observable<boolean> = this.paymentsService.isLoading$;
    hasMoreElements$: Observable<boolean> = this.paymentsService.hasMore$;
    lastUpdated$: Observable<string> = this.paymentsService.lastUpdated$;
    expandedId$: Observable<number> = this.expandedIdManager.expandedId$;
    initParams$ = this.qp.params$;

    constructor(
        private paymentsService: FetchPaymentsService,
        private expandedIdManager: PaymentsExpandedIdManager,
        private paymentInstitutionRealmService: PaymentInstitutionRealmService,
        private qp: QueryParamsService<Filters>,
        private realmMixinService: RealmMixinService<PaymentSearchFormValue>
    ) {}

    ngOnInit(): void {
        this.realmMixinService.valueAndRealm$
            .pipe(untilDestroyed(this))
            .subscribe((v) => this.paymentsService.search(v));
    }

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
        this.realmMixinService.valueChange({
            ...otherFilters,
            ...paymentMethod,
            fromTime: dateRange.start.utc().format(),
            toTime: dateRange.end.utc().format(),
            realm: null,
        });
    }

    expandedIdChange(id: number): void {
        this.expandedIdManager.expandedIdChange(id);
    }
}
