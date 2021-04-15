import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { ComponentChange, ComponentChanges } from '@rbkmoney/utils';
import isNil from 'lodash.isnil';
import isObject from 'lodash.isobject';

import {
    DigitalWalletDetails,
    DigitalWalletDetailsQIWI,
    PaymentToolDetailsDigitalWallet,
} from '@dsh/api-codegen/capi/swagger-codegen';

import DigitalWalletDetailsTypeEnum = PaymentToolDetailsDigitalWallet.DigitalWalletDetailsTypeEnum;

@Component({
    selector: 'dsh-digital-wallet',
    templateUrl: 'digital-wallet.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DigitalWalletComponent implements OnChanges {
    @Input() digitalWallet: DigitalWalletDetails;

    qiwi: DigitalWalletDetailsQIWI;

    ngOnChanges(changes: ComponentChanges<DigitalWalletComponent>): void {
        if (isObject(changes.digitalWallet)) {
            this.updateWallet(changes.digitalWallet);
        }
    }

    private updateWallet({
        currentValue: digitalWallet,
    }: ComponentChange<DigitalWalletComponent, 'digitalWallet'>): void {
        if (isNil(digitalWallet)) {
            return;
        }

        switch (digitalWallet.digitalWalletDetailsType) {
            case DigitalWalletDetailsTypeEnum.DigitalWalletDetailsQIWI:
                this.qiwi = digitalWallet as DigitalWalletDetailsQIWI;
                return;
        }
    }
}
