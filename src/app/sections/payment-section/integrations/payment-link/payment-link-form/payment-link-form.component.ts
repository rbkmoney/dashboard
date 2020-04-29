import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { PaymentLinkFormService } from './payment-link-form.service';

enum HoldExpiration {
    cancel = 'cancel',
    capture = 'capture'
}

@Component({
    selector: 'dsh-payment-link-form',
    templateUrl: 'payment-link-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentLinkFormComponent {
    @Output()
    back = new EventEmitter<void>();

    form = this.createForm();

    link$ = this.paymentLinkFormService.invoiceTemplatePaymentLink$;

    constructor(private fb: FormBuilder, private paymentLinkFormService: PaymentLinkFormService) {}

    clear() {
        this.form.patchValue(this.createForm().value);
    }

    create() {
        this.paymentLinkFormService.createInvoiceTemplatePaymentLink(this.form.value);
    }

    copied() {}

    private createForm() {
        return this.fb.group({
            name: '',
            description: '',
            email: '',
            redirectUrl: '',
            bankCard: true,
            wallets: false,
            terminals: false,
            applePay: false,
            googlePay: false,
            samsungPay: false,
            paymentFlowHold: false,
            holdExpiration: HoldExpiration.cancel,
            link: ''
        });
    }
}
