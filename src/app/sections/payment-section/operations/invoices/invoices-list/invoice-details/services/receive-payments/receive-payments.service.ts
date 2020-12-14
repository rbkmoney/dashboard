import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';

import { Payment } from '@dsh/api-codegen/capi';
import { PaymentService } from '@dsh/api/payment';

@UntilDestroy()
@Injectable()
export class ReceivePaymentsService {
    isLoading$: Observable<boolean>;
    errorOccurred$: Observable<boolean>;
    payments$: Observable<Payment[]>;

    private receivePayments$ = new Subject<string>();
    private loading$ = new BehaviorSubject(false);
    private error$ = new Subject<boolean>();
    private receivedPayments$ = new ReplaySubject<Payment[]>(1);

    constructor(private paymentService: PaymentService) {
        this.isLoading$ = this.loading$.asObservable();
        this.errorOccurred$ = this.error$.asObservable();
        this.payments$ = this.receivedPayments$.asObservable();
        this.receivePayments$
            .pipe(
                tap(() => this.loading$.next(true)),
                switchMap((invoiceID) =>
                    this.paymentService.getPayments(invoiceID).pipe(
                        catchError((e) => {
                            console.error(e);
                            this.loading$.next(false);
                            this.error$.next();
                            return of('error');
                        })
                    )
                ),
                filter((result) => result !== 'error'),
                map((r) => r as Payment[]),
                untilDestroyed(this)
            )
            .subscribe((payments: Payment[]) => {
                this.loading$.next(false);
                this.receivedPayments$.next(payments);
            });
    }

    receivePayments(invoiceID: string) {
        this.receivePayments$.next(invoiceID);
    }
}
