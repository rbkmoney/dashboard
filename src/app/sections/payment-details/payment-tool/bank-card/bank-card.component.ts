import { Component, Input } from '@angular/core';

import { BankCardDetails, PaymentToolDetailsBankCard } from '../../../../api/capi/swagger-codegen';

@Component({
    selector: 'dsh-bank-card',
    templateUrl: './bank-card.component.html'
})
export class BankCardComponent {
    @Input() bankCard: BankCardDetails;

    paymentSystems = PaymentToolDetailsBankCard.PaymentSystemEnum;
    tokenProviders = PaymentToolDetailsBankCard.TokenProviderEnum;

    localePath = 'sections.paymentDetails.paymentTool';
}
