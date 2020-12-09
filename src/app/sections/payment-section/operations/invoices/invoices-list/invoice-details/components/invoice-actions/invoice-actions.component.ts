import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Invoice } from '../../../../../../../../api-codegen/anapi';
import { CancelInvoiceService } from '../../cancel-invoice';
import { CreatePaymentLinkService } from '../../create-payment-link';

@Component({
    selector: 'dsh-invoice-actions',
    templateUrl: 'invoice-actions.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceActionsComponent {
    @Input() invoice: Invoice;

    constructor(
        private createPaymentLinkService: CreatePaymentLinkService,
        private cancelInvoiceService: CancelInvoiceService
    ) {}

    createPaymentLink() {
        this.createPaymentLinkService.createPaymentLink({ invoice: this.invoice });
    }

    cancelInvoice() {
        this.cancelInvoiceService.cancelInvoice(this.invoice.id);
    }

    fulfillInvoice() {
        this.createPaymentLinkService.createPaymentLink({ invoice: this.invoice });
    }
}
