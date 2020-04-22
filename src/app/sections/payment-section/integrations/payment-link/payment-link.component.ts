import { ChangeDetectionStrategy, Component } from '@angular/core';

enum Step {
    invoiceTemplate,
    paymentLink
}

@Component({
    selector: 'dsh-payment-link',
    templateUrl: 'payment-link.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentLinkComponent {
    step = Step;
    currentStep = Step.invoiceTemplate;
}
