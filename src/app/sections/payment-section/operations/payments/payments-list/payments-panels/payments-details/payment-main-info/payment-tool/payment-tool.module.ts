import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { CardModule, DetailsItemModule } from '@dsh/components/layout';

import { UtilsModule as PaymentDetailsModule } from '../../../../../../../../payment-details/utils';
import { BankCardComponent } from './components/bank-card/bank-card.component';
import { DigitalWalletComponent } from './components/digital-wallet/digital-wallet.component';
import { MobileCommerceComponent } from './components/mobile-commerce/mobile-commerce.component';
import { PaymentTerminalComponent } from './components/payment-terminal';
import { PaymentToolComponent } from './payment-tool.component';

@NgModule({
    imports: [
        TranslocoModule,
        CardModule,
        ButtonModule,
        CommonModule,
        FlexModule,
        DetailsItemModule,
        MatIconModule,
        PaymentDetailsModule,
    ],
    declarations: [
        PaymentToolComponent,
        BankCardComponent,
        DigitalWalletComponent,
        PaymentTerminalComponent,
        MobileCommerceComponent,
    ],
    exports: [PaymentToolComponent],
})
export class PaymentToolModule {}
