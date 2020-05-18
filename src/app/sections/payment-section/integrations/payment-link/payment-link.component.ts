import { ChangeDetectionStrategy, Component } from '@angular/core';

import { InvoiceTemplateFormService } from './invoice-template-form';
import { PaymentLinkFormService } from './payment-link-form';

enum Step {
    invoiceTemplate,
    paymentLink,
}

@Component({
    selector: 'dsh-payment-link',
    templateUrl: 'payment-link.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [InvoiceTemplateFormService, PaymentLinkFormService],
})
export class PaymentLinkComponent {
    step = Step;
    currentStep = Step.invoiceTemplate;
}
