import { Component, Input } from '@angular/core';

import { BankCardDetails, PaymentToolDetailsBankCard } from '@dsh/api-codegen/capi/swagger-codegen';

@Component({
    selector: 'dsh-bank-card',
    templateUrl: 'bank-card.component.html',
})
export class BankCardComponent {
    @Input() bankCard: BankCardDetails;

    paymentSystems = PaymentToolDetailsBankCard.PaymentSystemEnum;
    tokenProviders = PaymentToolDetailsBankCard.TokenProviderEnum;
}
