import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Invoice } from '@dsh/api-codegen/capi';

@Component({
    selector: 'dsh-payment-invoice-info',
    templateUrl: 'payment-invoice-info.component.html',
    styleUrls: ['payment-invoice-info.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
// TODO: implement dump component for this + shared one for operations
export class PaymentInvoiceInfoComponent {
    @Input() invoice: Invoice;
}
