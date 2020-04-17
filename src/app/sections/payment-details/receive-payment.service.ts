import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, shareReplay, switchMap } from 'rxjs/operators';

import { progress } from '../../custom-operators';
import { RouteParamPaymentService } from './route-param-payment.service';
import { PaymentSearchResult } from '../../api-codegen/anapi/swagger-codegen';

@Injectable()
export class ReceivePaymentService {
    private paymentState$ = new BehaviorSubject(null);
    private receivePaymentError$ = new BehaviorSubject(false);
    private receivePayment$ = new Subject();

    payment$: Observable<PaymentSearchResult> = this.paymentState$.pipe(
        filter(s => !!s),
        shareReplay(1)
    );

    isLoading$ = progress(this.receivePayment$, this.payment$);

    error$: Observable<any> = this.receivePaymentError$.asObservable();

    receivePayment() {
        this.receivePayment$.next();
    }

    constructor(
        private routeParamPaymentService: RouteParamPaymentService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        this.receivePayment$.pipe(switchMap(() => this.routeParamPaymentService.payment$)).subscribe(
            payment => this.paymentState$.next(payment),
            err => {
                console.error(err);
                this.snackBar.open(this.transloco.translate('commonError'), 'OK');
                this.receivePaymentError$.next(true);
            }
        );
    }
}
