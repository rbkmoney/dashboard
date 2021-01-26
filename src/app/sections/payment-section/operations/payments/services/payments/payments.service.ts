import { Inject, Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, distinctUntilChanged, map, switchMap, take } from 'rxjs/operators';

import { PaymentSearchResult } from '@dsh/api-codegen/anapi';
import { PaymentInstitutionRealm } from '@dsh/api/model';
import { Duration, PaymentSearchService } from '@dsh/api/search';
import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';
import { ErrorService } from '@dsh/app/shared/services';

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
export class PaymentsService {
    paymentsList$: Observable<PaymentSearchResult[]> = this.cacheService.payments$;
    isLoading$: Observable<boolean>;
    lastUpdated$: Observable<string> = this.fetchPaymentsService.lastUpdated$;
    hasMore$: Observable<boolean> = this.fetchPaymentsService.hasMore$;

    private innerLoading$ = new BehaviorSubject<boolean>(false);

    constructor(
        private paymentSearchService: PaymentSearchService,
        private fetchPaymentsService: FetchPaymentsService,
        private cacheService: PaymentsCachingService,
        private errorsService: ErrorService,
        @Inject(SEARCH_LIMIT)
        private searchLimit: number,
        @Inject(PAYMENTS_UPDATE_DELAY_TOKEN)
        private updateDelay: number
    ) {
        this.initFetchedPaymentsCaching();
        this.initFetcherErrorsHandling();

        this.isLoading$ = this.innerLoading$.pipe(distinctUntilChanged());
    }

    initRealm(realm: PaymentInstitutionRealm): void {
        this.fetchPaymentsService.initRealm(realm);
    }

    search(data: PaymentSearchFormValue): void {
        this.startLoading();
        this.clearCache();
        this.fetchPaymentsService.search(data);
    }

    refresh(): void {
        this.startLoading();
        this.clearCache();
        this.fetchPaymentsService.refresh();
    }

    loadMore(): void {
        this.startLoading();
        this.fetchPaymentsService.fetchMore();
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

    private initFetchedPaymentsCaching(): void {
        this.fetchPaymentsService.paymentsList$
            .pipe(
                // last page - slice last searchLimit elements. Cache service won't update them on adding
                map((payments: PaymentSearchResult[]) => this.getLastPaymentsPage(payments)),
                untilDestroyed(this)
            )
            .subscribe((payments: PaymentSearchResult[]) => {
                this.cacheService.addElements(...payments);
                this.stopLoading();
            });
    }

    private initFetcherErrorsHandling(): void {
        this.fetchPaymentsService.errors$.pipe(untilDestroyed(this)).subscribe((error: Error) => {
            this.errorsService.error(error);
            this.stopLoading();
        });
    }

    private scheduleUpdate(): Observable<void> {
        return of(null).pipe(delay(this.updateDelay));
    }

    private getLastPaymentsPage(payments: PaymentSearchResult[]): PaymentSearchResult[] {
        return payments.slice(-this.searchLimit);
    }

    private clearCache(): void {
        this.cacheService.clear();
    }

    private startLoading(): void {
        this.innerLoading$.next(true);
    }

    private stopLoading(): void {
        this.innerLoading$.next(false);
    }
}