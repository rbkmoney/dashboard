import { Component, Input } from '@angular/core';

import { Invoice } from '@dsh/api-codegen/capi';

@Component({
    selector: 'dsh-payment-invoice-info',
    templateUrl: 'payment-invoice-info.component.html',
    styleUrls: ['payment-invoice-info.component.scss'],
})
export class PaymentInvoiceInfoComponent {
    @Input() invoice: Invoice;
}
