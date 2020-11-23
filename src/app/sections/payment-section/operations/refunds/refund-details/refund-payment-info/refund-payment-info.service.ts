import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';

import { PaymentSearchResult } from '../../../../../../api-codegen/capi/swagger-codegen';
import { PaymentService } from '../../../../../../api/payment';

export interface ReceivePaymentParams {
    invoiceID: string;
    paymentID: string;
}

@Injectable()
export class RefundPaymentInfoService {
    private receivePayment$ = new Subject<ReceivePaymentParams>();
    private loading$ = new BehaviorSubject(false);
    private error$ = new Subject();
    private receivedPayment$ = new Subject<PaymentSearchResult>();

    isLoading$ = this.loading$.asObservable();
    errorOccurred$ = this.error$.asObservable();
    payment$ = this.receivedPayment$.asObservable();

    constructor(private paymentService: PaymentService) {
        this.receivePayment$
            .pipe(
                tap(() => this.loading$.next(true)),
                switchMap(({ invoiceID, paymentID }) =>
                    this.paymentService.getPaymentByID(invoiceID, paymentID).pipe(
                        catchError((e) => {
                            console.error(e);
                            this.loading$.next(false);
                            this.error$.next();
                            return of('error');
                        })
                    )
                ),
                filter((result) => result !== 'error'),
                map((r) => r as PaymentSearchResult)
            )
            .subscribe((payment: PaymentSearchResult) => {
                this.loading$.next(false);
                this.receivedPayment$.next(payment);
            });
    }

    receivePayment(params: ReceivePaymentParams) {
        this.receivePayment$.next(params);
    }
}
