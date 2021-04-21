import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Subject, timer } from 'rxjs';
import { filter, first, shareReplay, startWith, switchMap, timeout } from 'rxjs/operators';

import { PaymentSearchResult } from '@dsh/api-codegen/capi/swagger-codegen';
import { Duration, PaymentSearchService } from '@dsh/api/search';

import { filterError, filterPayload, progress, replaceError, SHARE_REPLAY_CONF } from '../../custom-operators';

const COMPLETED_STATUSES: PaymentSearchResult.StatusEnum[] = [
    PaymentSearchResult.StatusEnum.Captured,
    PaymentSearchResult.StatusEnum.Cancelled,
];

enum ReceivePaymentType {
    Hold = 'hold',
    Receive = 'receive',
}

const TIME_UNTIL_START = 500;
const TIMER_PERIOD = 1000;
const TIMER_TIMEOUT = 30000;

@Injectable()
export class ReceivePaymentService {
    private receivePayment$ = new Subject<ReceivePaymentType>();

    private paymentOrError$ = this.receivePayment$.pipe(
        startWith(ReceivePaymentType.Receive),
        switchMap((type) => {
            const { invoiceID, paymentID } = this.route.snapshot.params;
            const duration: Duration = {
                amount: 3,
                unit: 'y',
            };
            return type === ReceivePaymentType.Hold
                ? timer(TIME_UNTIL_START, TIMER_PERIOD).pipe(
                      switchMap(() => this.paymentSearchService.getPaymentByDuration(duration, invoiceID, paymentID)),
                      filter((p) => COMPLETED_STATUSES.includes(p?.status)),
                      first(),
                      timeout(TIMER_TIMEOUT)
                  )
                : this.paymentSearchService.getPaymentByDuration(duration, invoiceID, paymentID);
        }),
        replaceError,
        shareReplay(SHARE_REPLAY_CONF)
    );

    payment$ = this.paymentOrError$.pipe(filterPayload, shareReplay(SHARE_REPLAY_CONF));

    error$ = this.paymentOrError$.pipe(filterError, shareReplay(SHARE_REPLAY_CONF));

    isLoading$ = progress(this.receivePayment$, this.payment$);

    constructor(
        private snackBar: MatSnackBar,
        private transloco: TranslocoService,
        private route: ActivatedRoute,
        private paymentSearchService: PaymentSearchService
    ) {
        this.error$.subscribe(() => this.snackBar.open(this.transloco.translate('commonError'), 'OK'));
    }

    holdPayment() {
        this.receivePayment$.next(ReceivePaymentType.Hold);
    }
}
