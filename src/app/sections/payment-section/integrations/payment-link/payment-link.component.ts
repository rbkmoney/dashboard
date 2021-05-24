import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReplaySubject } from 'rxjs';

import { Invoice, InvoiceTemplateAndToken } from '@dsh/api-codegen/capi';

import {
    CreateInvoiceOrInvoiceTemplateService,
    InvoiceOrInvoiceTemplate,
    Type,
} from './create-invoice-or-invoice-template';

enum Step {
    InvoiceTemplate,
    PaymentLink,
}

@Component({
    selector: 'dsh-payment-link',
    templateUrl: 'payment-link.component.html',
    styleUrls: ['payment-link.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CreateInvoiceOrInvoiceTemplateService],
})
export class PaymentLinkComponent {
    step = Step;
    currentStep = Step.InvoiceTemplate;

    invoiceTemplate$ = new ReplaySubject<InvoiceTemplateAndToken>(1);
    invoice$ = new ReplaySubject<Invoice>(1);

    nextInvoiceOrInvoiceTemplate({ type, invoiceOrInvoiceTemplate }: InvoiceOrInvoiceTemplate): void {
        if (type === Type.Invoice) {
            this.invoice$.next(invoiceOrInvoiceTemplate as Invoice);
        } else {
            this.invoiceTemplate$.next(invoiceOrInvoiceTemplate as InvoiceTemplateAndToken);
        }
        this.currentStep = Step.PaymentLink;
    }
}
