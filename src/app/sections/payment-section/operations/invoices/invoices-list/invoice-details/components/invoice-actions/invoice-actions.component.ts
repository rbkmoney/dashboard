import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { CreatePaymentLinkService } from '@dsh/app/shared/components/create-payment-link';

import { Invoice } from '../../../../../../../../api-codegen/anapi';
import { CancelInvoiceService } from '../../cancel-invoice';
import { FulfillInvoiceService } from '../../fulfill-invoice';

@UntilDestroy()
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
    ) {}

    createPaymentLink() {
        this.createPaymentLinkService.createPaymentLink({ invoice: this.invoice });
    }

    cancelInvoice() {
        this.cancelInvoiceService
            .cancelInvoice(this.invoice.id)
            .pipe(untilDestroyed(this))
            .subscribe(() => this.refreshData.emit());
    }

    fulfillInvoice() {
        this.fulfillInvoiceService
            .fulfillInvoice(this.invoice.id)
            .pipe(untilDestroyed(this))
            .subscribe(() => this.refreshData.emit());
    }
}
