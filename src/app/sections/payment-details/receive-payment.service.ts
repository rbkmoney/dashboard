import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { BehaviorSubject, EMPTY, Observable, Subject, timer } from 'rxjs';
import { catchError, filter, first, shareReplay, startWith, switchMap } from 'rxjs/operators';

import { PaymentSearchResult } from '../../api-codegen/capi/swagger-codegen';
import { PaymentSearchService } from '../../api/search';
import { progress, SHARE_REPLAY_CONF } from '../../custom-operators';

const completedStatuses: PaymentSearchResult.StatusEnum[] = [
    PaymentSearchResult.StatusEnum.Captured,
    PaymentSearchResult.StatusEnum.Cancelled
];

export enum ReceivePaymentType {
    Hold = 'hold',
    Receive = 'receive'
}

@Injectable()
export class ReceivePaymentService {
    private receivePaymentError$ = new BehaviorSubject(false);
    private receivePayment$ = new Subject<ReceivePaymentType>();

    payment$ = this.receivePayment$.pipe(
        startWith(ReceivePaymentType.Receive),
        switchMap(type => {
            const { invoiceID, paymentID } = this.route.snapshot.params;
            console.log(type, type === ReceivePaymentType.Hold);
            return type === ReceivePaymentType.Hold
                ? timer(0, 500).pipe(
                      switchMap(() =>
                          this.paymentSearchService
                              .getPaymentByDuration(
                                  {
                                      amount: 3,
                                      unit: 'y'
                                  },
                                  invoiceID,
                                  paymentID
                              )
                              .pipe(
                                  catchError(() => {
                                      this.receivePaymentError$.next(true);
                                      return EMPTY;
                                  })
                              )
                      ),
                      filter(p => completedStatuses.includes(p?.status)),
                      first()
                  )
                : this.paymentSearchService.getPaymentByDuration(
                      {
                          amount: 3,
                          unit: 'y'
                      },
                      invoiceID,
                      paymentID
                  );
        }),
        shareReplay(SHARE_REPLAY_CONF)
    );

    isLoading$ = progress(this.receivePayment$, this.payment$);

    error$: Observable<any> = this.receivePaymentError$.asObservable();

    receivePayment(type = ReceivePaymentType.Receive) {
        this.receivePayment$.next(type);
    }

    constructor(
        private snackBar: MatSnackBar,
        private transloco: TranslocoService,
        private route: ActivatedRoute,
        private paymentSearchService: PaymentSearchService
    ) {
        this.error$.subscribe(() => this.snackBar.open(this.transloco.translate('commonError'), 'OK'));
    }
}
