import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Invoice } from '../../../api-codegen/capi';
import { CreatePaymentLinkDialogComponent } from './create-payment-link-dialog';

@Component({
    selector: 'dsh-payment-link',
    templateUrl: 'payment-link.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentLinkComponent {
    @Input()
    invoice: Invoice;

    constructor(private dialog: MatDialog) {}

    create() {
        this.dialog.open(CreatePaymentLinkDialogComponent, {
            width: '720px',
            maxHeight: '90vh',
            disableClose: true,
            data: { invoice: this.invoice },
        });
    }
}
