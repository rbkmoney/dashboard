import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Invoice } from '@dsh/api-codegen/capi';

@Component({
    selector: 'dsh-payment-invoice-info',
    templateUrl: 'payment-invoice-info.component.html',
    styleUrls: ['payment-invoice-info.component.scss'],
})
export class PaymentInvoiceInfoComponent {
    @Input() invoice: Invoice;

    constructor(private router: Router) {}

    navToInvoiceDetails({ id }: Invoice): void {
        this.router.navigate(['invoice', id]);
    }
}
