import { Component, OnInit, Input } from '@angular/core';
import { Invoice } from '@dsh/api-codegen/capi';
import { Router } from '@angular/router';

@Component({
    selector: 'dsh-payment-invoice-info',
    templateUrl: './payment-invoice-info.component.html',
    styleUrls: ['./payment-invoice-info.component.scss']
})
export class PaymentInvoiceInfoComponent {
    @Input() invoice: Invoice;

    constructor(private router: Router) {
    }

    navToInvoiceDetails({ id }: Invoice): void {
        this.router.navigate(['invoice', id]);
    }
}
