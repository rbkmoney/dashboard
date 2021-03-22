import { Inject, Injectable } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { switchMap, take } from 'rxjs/operators';

import { PaymentSearchResult } from '@dsh/api-codegen/anapi';
import { PaymentInstitutionRealm } from '@dsh/api/model';
import { Duration, PaymentSearchService } from '@dsh/api/search';
import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';
import { ErrorService } from '@dsh/app/shared/services';
import { FetchedDataAggregator } from '@dsh/app/shared/services/list/fetched-data-aggregator';

import { PAYMENTS_UPDATE_DELAY_TOKEN } from '../../consts';
import { PaymentSearchFormValue } from '../../types/payment-search-form-value';
import { FetchPaymentsService } from '../fetch-payments/fetch-payments.service';
import { PaymentsCachingService } from '../payments-caching/payments-caching.service';

// three years duration is enough now to find payment using invoiceID and paymentID
export const SINGLE_PAYMENT_REQUEST_DURATION: Duration = {
    amount: 3,
    unit: 'y',
};

@UntilDestroy()
@Injectable()
export class PaymentsService extends FetchedDataAggregator<PaymentSearchFormValue, PaymentSearchResult> {
    constructor(
        private paymentSearchService: PaymentSearchService,
        private fetchPaymentsService: FetchPaymentsService,
        cacheService: PaymentsCachingService,
        errorsService: ErrorService,
        @Inject(SEARCH_LIMIT)
        searchLimit: number,
        @Inject(PAYMENTS_UPDATE_DELAY_TOKEN)
        updateDelay: number
    ) {
        super(errorsService, fetchPaymentsService, searchLimit, updateDelay, cacheService);
    }

    initRealm(realm: PaymentInstitutionRealm): void {
        this.fetchPaymentsService.initRealm(realm);
    }

    updatePayment(invoiceID: string, paymentID: string): void {
        this.scheduleUpdate()
            .pipe(
                switchMap(() => {
                    return this.paymentSearchService.getPaymentByDuration(
                        SINGLE_PAYMENT_REQUEST_DURATION,
                        invoiceID,
                        paymentID
                    );
                }),
                take(1)
            )
            .subscribe((payment: PaymentSearchResult) => {
                this.cacheService.updateElements(payment);
            });
    }
}
