import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { pluck, shareReplay, take } from 'rxjs/operators';

import { PaymentSearchResult } from '@dsh/api-codegen/anapi';
import { PaymentInstitutionRealm } from '@dsh/api/model';
import { booleanDebounceTime, mapToTimestamp } from '@dsh/operators';

import { PaymentsFiltersData } from './payments-filters/types/payments-filters-data';
import { FetchPaymentsService } from './services/fetch-payments/fetch-payments.service';
import { PaymentsExpandedIdManager } from './services/payments-expanded-id-manager/payments-expanded-id-manager.service';
import { PaymentSearchFormValue } from './types/payment-search-form-value';

@UntilDestroy()
@Component({
    selector: 'dsh-payments',
    templateUrl: 'payments.component.html',
    providers: [FetchPaymentsService, PaymentsExpandedIdManager],
})
export class PaymentsComponent implements OnInit {
    realm$: Observable<PaymentInstitutionRealm> = this.route.params.pipe(pluck('realm'), take(1));

    payments$: Observable<PaymentSearchResult[]> = this.paymentsService.paymentsList$;
    isLoading$: Observable<boolean> = this.paymentsService.doAction$.pipe(booleanDebounceTime(), shareReplay(1));
    hasMoreElements$: Observable<boolean> = this.paymentsService.hasMore$;
    lastUpdated$: Observable<string> = this.paymentsService.searchResult$.pipe(mapToTimestamp, shareReplay(1));
    expandedId$: Observable<number> = this.expandedIdManager.expandedId$;

    constructor(
        private paymentsService: FetchPaymentsService,
        private route: ActivatedRoute,
        private expandedIdManager: PaymentsExpandedIdManager
    ) {}

    ngOnInit(): void {
        this.realm$.subscribe((realm: PaymentInstitutionRealm) => {
            this.paymentsService.initRealm(realm);
        });
    }

    refreshList(): void {
        this.paymentsService.refresh();
    }

    requestNextPage(): void {
        this.paymentsService.fetchMore();
    }

    filtersChanged(filtersData: PaymentsFiltersData): void {
        this.requestList(filtersData);
    }

    expandedIdChange(id: number): void {
        this.expandedIdManager.expandedIdChange(id);
    }

    private requestList({ daterange, shopIDs, invoiceIDs, binPan, additional }: PaymentsFiltersData): void {
        this.paymentsService.search({
            date: {
                begin: daterange.begin,
                end: daterange.end,
            },
            invoiceIDs,
            shopIDs,
            ...this.formatBinPanParams(binPan),
            ...additional,
        });
    }

    private formatBinPanParams(
        binPan: PaymentsFiltersData['binPan']
    ): Partial<Pick<PaymentSearchFormValue, 'paymentMethod' | 'first6' | 'last4'>> {
        const { bin = null, pan = null, paymentMethod } = binPan ?? {};
        const binPanFilterData =
            Boolean(bin) || Boolean(pan)
                ? {
                      paymentMethod,
                      first6: bin,
                      last4: pan,
                  }
                : {};

        return Object.entries(binPanFilterData).reduce(
            (
                filtersData: Partial<Pick<PaymentSearchFormValue, 'paymentMethod' | 'first6' | 'last4'>>,
                [key, value]: [string, string]
            ) => {
                if (value) {
                    filtersData[key] = value;
                }
                return filtersData;
            },
            {}
        );
    }
}
