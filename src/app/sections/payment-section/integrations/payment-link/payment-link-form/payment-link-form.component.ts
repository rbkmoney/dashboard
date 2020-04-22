import { ChangeDetectionStrategy, Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { PaymentLinkService } from '../payment-link.service';

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

    constructor(private fb: FormBuilder, private paymentLinkService: PaymentLinkService) {}

    clear() {
        this.form.patchValue(this.createForm().value);
    }

    create() {
        this.paymentLinkService.createInvoiceTemplatePaymentLink(this.form.value);
    }

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
            holdExpiration: HoldExpiration.cancel
        });
    }
}
