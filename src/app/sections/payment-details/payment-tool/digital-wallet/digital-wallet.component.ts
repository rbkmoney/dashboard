import { Component, Input, OnChanges } from '@angular/core';

import { DigitalWalletDetails, DigitalWalletDetailsQIWI } from '../../../../api/capi/swagger-codegen';

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
            case 'DigitalWalletDetailsQIWI':
                this.qiwi = this.digitalWallet as DigitalWalletDetailsQIWI;
                break;
        }
    }
}
