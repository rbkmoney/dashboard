import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';

import { PaymentSearchResult } from '../../../../../../api-codegen/capi/swagger-codegen';
import { PaymentService } from '../../../../../../api/payment';

@Component({
    selector: 'dsh-payment-info',
    templateUrl: 'payment-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [PaymentService],
})
export class PaymentInfoComponent implements OnInit {
    @Input() invoiceID: string;
    @Input() paymentID: string;

    payment$ = new Subject<PaymentSearchResult>();

    constructor(private paymentService: PaymentService) {}

    ngOnInit() {
        this.paymentService
            .getPaymentByID(this.invoiceID, this.paymentID)
            .pipe(take(1))
            .subscribe((payment) => this.payment$.next(payment));
    }
}
