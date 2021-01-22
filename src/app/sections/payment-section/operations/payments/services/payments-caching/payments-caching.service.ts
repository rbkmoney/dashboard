import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';

import { PaymentSearchResult } from '@dsh/api-codegen/anapi';

import { CachedPayment } from '../../types/cached-payment';
import { getPaymentId } from '../../utils/get-payment-id';

@UntilDestroy()
@Injectable()
export class PaymentsCachingService {
    payments$: Observable<PaymentSearchResult[] | null>;

    private paymentsMap = new Map<string, CachedPayment>();
    private paymentsList$ = new BehaviorSubject<PaymentSearchResult[]>([]);
    private cacheUpdates$ = new ReplaySubject<PaymentSearchResult[]>(1);

    private get cachedPayments(): PaymentSearchResult[] {
        return this.paymentsList$.value;
    }

    constructor() {
        this.payments$ = this.paymentsList$.asObservable();
        this.initUpdatesListener();
    }

    addElements(...payments: PaymentSearchResult[]): void {
        this.addToCache(payments);
    }

    updateElements(...payments: PaymentSearchResult[]): void {
        this.cacheUpdates$.next(payments);
    }

    clear(): void {
        this.clearCache();
    }

    private initUpdatesListener(): void {
        this.cacheUpdates$.pipe(untilDestroyed(this)).subscribe((updatedList: PaymentSearchResult[]) => {
            this.updateCacheList(updatedList);
        });
    }

    private addToCache(list: PaymentSearchResult[]): void {
        const currentList = this.cachedPayments;
        const newPaymentsList = this.filterCachedElements(list);
        this.paymentsList$.next([...currentList, ...newPaymentsList]);
        this.updateCacheMap();
    }

    private updateCacheList(list: PaymentSearchResult[]): void {
        // to not mutate cached data we should make a shallow copy
        const paymentsList = this.cachedPayments.slice();

        list.forEach((payment: PaymentSearchResult) => {
            const paymentID = getPaymentId(payment);

            if (!this.paymentsMap.has(paymentID)) {
                return;
            }

            const { listIndex } = this.paymentsMap.get(paymentID);
            paymentsList.splice(listIndex, 1, payment);
        });

        this.paymentsList$.next(paymentsList);
        this.updateCacheMap();
    }

    private updateCacheMap(): void {
        this.cachedPayments.forEach((payment: PaymentSearchResult, listIndex: number) => {
            this.paymentsMap.set(getPaymentId(payment), {
                payment,
                listIndex,
            });
        });
    }

    private filterCachedElements(list: PaymentSearchResult[]): PaymentSearchResult[] {
        return list.filter((payment: PaymentSearchResult) => {
            const paymentID = getPaymentId(payment);
            return !this.paymentsMap.has(paymentID);
        });
    }

    private clearCache(): void {
        this.paymentsList$.next([]);
        this.paymentsMap.clear();
    }
}
