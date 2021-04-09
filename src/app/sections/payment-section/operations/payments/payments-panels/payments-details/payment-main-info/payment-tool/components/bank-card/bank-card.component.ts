import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { BankCardDetails, PaymentToolDetailsBankCard } from '@dsh/api-codegen/capi/swagger-codegen';

interface BankCardIconConfig {
    iconName: string;
    width: string;
    heigth: string;
}

@Component({
    selector: 'dsh-bank-card',
    templateUrl: 'bank-card.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BankCardComponent {
    @Input() bankCard: BankCardDetails;

    getPaymentSystemIconConfig(paymentSystem: PaymentToolDetailsBankCard.PaymentSystemEnum): BankCardIconConfig {
        switch (paymentSystem) {
            case 'visa':
                return { iconName: 'visa', width: '32px', heigth: '24px' };
            case 'mastercard':
                return { iconName: 'mastercard', width: '24px', heigth: '24px' };
            case 'nspkmir':
                return { iconName: 'mir', width: '32px', heigth: '24px' };
            default:
                return null;
        }
    }

    getTokenProviderIconConfig(tokenProvider: PaymentToolDetailsBankCard.TokenProviderEnum): BankCardIconConfig {
        switch (tokenProvider) {
            case 'samsungpay':
                return { iconName: 'samsung_pay', width: '100px', heigth: '27px' };
            case 'googlepay':
                return { iconName: 'google_pay', width: '40px', heigth: '26px' };
            case 'applepay':
                return { iconName: 'apple_pay', width: '24px', heigth: '24px' };
            case 'yandexpay':
                return { iconName: 'yandex_pay', width: '44px', heigth: '24px' };
            default:
                return null;
        }
    }
}
