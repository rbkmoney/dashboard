import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay, take } from 'rxjs/operators';

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

    payment$: Observable<PaymentSearchResult>;

    constructor(private paymentService: PaymentService) {}

    ngOnInit() {
        this.payment$ = this.paymentService
            .getPaymentByID(this.invoiceID, this.paymentID)
            .pipe(take(1), shareReplay(1));
    }
}
