import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { DIALOG_CONFIG, DialogConfig } from '@dsh/app/sections/tokens';

import { Invoice } from '../../../../../../../../api-codegen/anapi';
import { CancelInvoiceService } from '../../cancel-invoice';
import {
    CreatePaymentLinkDialogData,
    CreatePaymentLinkDialogResponse,
    CreatePaymentLinkDialogComponent,
} from '../../create-payment-link-dialog';
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
        private fulfillInvoiceService: FulfillInvoiceService,
        private cancelInvoiceService: CancelInvoiceService,
        private dialog: MatDialog,
        @Inject(DIALOG_CONFIG) private dialogConfig: DialogConfig
    ) {}

    createPaymentLink(): void {
        this.dialog.open<
            CreatePaymentLinkDialogComponent,
            CreatePaymentLinkDialogData,
            CreatePaymentLinkDialogResponse
        >(CreatePaymentLinkDialogComponent, {
            ...this.dialogConfig.large,
            data: { invoice: this.invoice },
        });
    }

    cancelInvoice(): void {
        this.cancelInvoiceService
            .cancelInvoice(this.invoice.id)
            .pipe(untilDestroyed(this))
            .subscribe(() => this.refreshData.emit());
    }

    fulfillInvoice(): void {
        this.fulfillInvoiceService
            .fulfillInvoice(this.invoice.id)
            .pipe(untilDestroyed(this))
            .subscribe(() => this.refreshData.emit());
    }
}
