import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { ReceiveInvoiceService } from '../../services/receive-invoice/receive-invoice.service';

@Component({
    selector: 'dsh-refund-invoice-info',
    templateUrl: 'refund-invoice-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ReceiveInvoiceService],
})
export class RefundInvoiceInfoComponent implements OnInit {
    @Input() invoiceID: string;

    invoice$ = this.refundPaymentInfoService.invoice$;
    isLoading$ = this.refundPaymentInfoService.isLoading$;
    errorOccurred$ = this.refundPaymentInfoService.errorOccurred$;

    constructor(private refundPaymentInfoService: ReceiveInvoiceService) {}

    ngOnInit() {
        this.refundPaymentInfoService.receivePayment(this.invoiceID);
    }
}
