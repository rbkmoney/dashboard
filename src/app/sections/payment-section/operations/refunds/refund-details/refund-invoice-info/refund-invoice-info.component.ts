import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { RefundInvoiceInfoService } from './refund-invoice-info.service';

@Component({
    selector: 'dsh-refund-invoice-info',
    templateUrl: 'refund-invoice-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [RefundInvoiceInfoService],
})
export class RefundInvoiceInfoComponent implements OnInit {
    @Input() invoiceID: string;

    invoice$ = this.refundPaymentInfoService.invoice$;
    isLoading$ = this.refundPaymentInfoService.isLoading$;
    errorOccurred$ = this.refundPaymentInfoService.errorOccurred$;

    constructor(private refundPaymentInfoService: RefundInvoiceInfoService) {}

    ngOnInit() {
        this.refundPaymentInfoService.receivePayment(this.invoiceID);
    }
}
