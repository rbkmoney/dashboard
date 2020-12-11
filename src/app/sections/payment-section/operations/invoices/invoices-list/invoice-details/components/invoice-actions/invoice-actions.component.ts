import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { merge } from 'rxjs';

import { Invoice } from '../../../../../../../../api-codegen/anapi';
import { CancelInvoiceService } from '../../cancel-invoice';
import { CreatePaymentLinkService } from '../../create-payment-link';
import { FulfillInvoiceService } from '../../fulfill-invoice';

@Component({
    selector: 'dsh-invoice-actions',
    templateUrl: 'invoice-actions.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CancelInvoiceService, FulfillInvoiceService],
})
export class InvoiceActionsComponent {
    @Input() invoice: Invoice;

    @Output() refreshData = new EventEmitter<void>();

    constructor(
        private createPaymentLinkService: CreatePaymentLinkService,
        private fulfillInvoiceService: FulfillInvoiceService,
        private cancelInvoiceService: CancelInvoiceService
    ) {
        merge(this.fulfillInvoiceService.invoiceFulfilled$, this.cancelInvoiceService.invoiceCancelled$).subscribe(() =>
            this.refreshData.emit()
        );
    }

    createPaymentLink() {
        this.createPaymentLinkService.createPaymentLink({ invoice: this.invoice });
    }

    cancelInvoice() {
        this.cancelInvoiceService.cancelInvoice(this.invoice.id);
    }

    fulfillInvoice() {
        this.fulfillInvoiceService.fulfillInvoice(this.invoice.id);
    }
}
