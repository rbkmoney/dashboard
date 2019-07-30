import { Component, Input, OnChanges } from '@angular/core';

import {
    DigitalWalletDetails,
    DigitalWalletDetailsQIWI,
    PaymentToolDetailsDigitalWallet
} from '../../../../api/capi/swagger-codegen';
import DigitalWalletDetailsTypeEnum = PaymentToolDetailsDigitalWallet.DigitalWalletDetailsTypeEnum;

@Component({
    selector: 'dsh-digital-wallet',
    templateUrl: './digital-wallet.component.html'
})
export class DigitalWalletComponent implements OnChanges {
    @Input() digitalWallet: DigitalWalletDetails;

    qiwi: DigitalWalletDetailsQIWI;

    localePath = 'sections.paymentDetails.paymentTool';

    ngOnChanges() {
        switch (this.digitalWallet.digitalWalletDetailsType) {
            case DigitalWalletDetailsTypeEnum.DigitalWalletDetailsQIWI:
                this.qiwi = this.digitalWallet as DigitalWalletDetailsQIWI;
                break;
        }
    }
}
