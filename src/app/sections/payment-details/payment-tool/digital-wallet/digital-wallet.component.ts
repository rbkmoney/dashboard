import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import {
    DigitalWalletDetails,
    DigitalWalletDetailsQIWI,
    PaymentToolDetailsDigitalWallet,
} from '@dsh/api-codegen/capi/swagger-codegen';
import DigitalWalletDetailsTypeEnum = PaymentToolDetailsDigitalWallet.DigitalWalletDetailsTypeEnum;

@Component({
    selector: 'dsh-digital-wallet',
    templateUrl: 'digital-wallet.component.html',
})
export class DigitalWalletComponent implements OnChanges {
    @Input() digitalWallet: DigitalWalletDetails;

    qiwi: DigitalWalletDetailsQIWI;

    ngOnChanges(changes: SimpleChanges) {
        if (changes.digitalWallet.previousValue !== changes.digitalWallet.currentValue) {
            switch (this.digitalWallet.digitalWalletDetailsType) {
                case DigitalWalletDetailsTypeEnum.DigitalWalletDetailsQIWI:
                    this.qiwi = this.digitalWallet as DigitalWalletDetailsQIWI;
                    break;
            }
        }
    }
}
