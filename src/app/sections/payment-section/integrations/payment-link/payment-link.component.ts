import { ChangeDetectionStrategy, Component } from '@angular/core';

import { InvoiceTemplateFormService } from './invoice-template-form';

enum Step {
    invoiceTemplate,
    paymentLink,
}

@Component({
    selector: 'dsh-payment-link',
    templateUrl: 'payment-link.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [InvoiceTemplateFormService],
})
export class PaymentLinkComponent {
    step = Step;
    currentStep = Step.invoiceTemplate;
    template$ = this.invoiceTemplateFormService.invoiceTemplateAndToken$;

    constructor(private invoiceTemplateFormService: InvoiceTemplateFormService) {}
}
