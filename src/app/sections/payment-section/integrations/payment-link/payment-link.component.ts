import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReplaySubject } from 'rxjs';

import { Invoice, InvoiceTemplateAndToken } from '@dsh/api-codegen/capi';

import {
    CreateInvoiceOrInvoiceTemplateService,
    InvoiceOrInvoiceTemplate,
    Type,
} from './create-invoice-or-invoice-template';

enum Step {
    invoiceTemplate,
    paymentLink,
}

@Component({
    selector: 'dsh-payment-link',
    templateUrl: 'payment-link.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CreateInvoiceOrInvoiceTemplateService],
})
export class PaymentLinkComponent {
    step = Step;
    currentStep = Step.invoiceTemplate;

    invoiceTemplate$ = new ReplaySubject<InvoiceTemplateAndToken>(1);
    invoice$ = new ReplaySubject<Invoice>(1);

    nextInvoiceOrInvoiceTemplate({ type, invoiceOrInvoiceTemplate }: InvoiceOrInvoiceTemplate) {
        if (type === Type.invoice) {
            this.invoice$.next(invoiceOrInvoiceTemplate as Invoice);
        } else {
            this.invoiceTemplate$.next(invoiceOrInvoiceTemplate as InvoiceTemplateAndToken);
        }
        this.currentStep = Step.paymentLink;
    }
}
