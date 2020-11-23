import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { RefundPaymentInfoService } from './refund-payment-info.service';

@Component({
    selector: 'dsh-refund-payment-info',
    templateUrl: 'refund-payment-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [RefundPaymentInfoService],
})
export class RefundPaymentInfoComponent implements OnInit {
    @Input() invoiceID: string;
    @Input() paymentID: string;

    payment$ = this.refundPaymentInfoService.payment$;
    isLoading$ = this.refundPaymentInfoService.isLoading$;
    errorOccurred$ = this.refundPaymentInfoService.errorOccurred$;

    constructor(private refundPaymentInfoService: RefundPaymentInfoService) {}

    ngOnInit() {
        this.refundPaymentInfoService.receivePayment({ invoiceID: this.invoiceID, paymentID: this.paymentID });
    }
}
