import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { EMPTY, Observable, ReplaySubject } from 'rxjs';
import { catchError, shareReplay, switchMap, take, tap } from 'rxjs/operators';

import { PaymentSearchResult } from '../../../../../../api-codegen/capi/swagger-codegen';
import { PaymentService } from '../../../../../../api/payment';

@Component({
    selector: 'dsh-refund-payment-info',
    templateUrl: 'refund-payment-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [PaymentService],
})
export class RefundPaymentInfoComponent implements OnInit {
    @Input() invoiceID: string;
    @Input() paymentID: string;

    private receivePayment$ = new ReplaySubject<void>();

    isLoading = false;
    isError = false;

    payment$: Observable<PaymentSearchResult> = this.receivePayment$.pipe(
        tap(() => (this.isLoading = true)),
        switchMap(() => this.paymentService.getPaymentByID(this.invoiceID, this.paymentID)),
        catchError(() => {
            this.isLoading = false;
            this.isError = true;
            return EMPTY;
        }),
        take(1),
        shareReplay(1)
    );

    constructor(private paymentService: PaymentService) {}

    ngOnInit() {
        this.receivePayment$.next();
        this.payment$.subscribe(() => (this.isLoading = false));
    }
}
