import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';

import { CardModule } from '../../../layout/card';
import { ButtonModule } from '../../../button';
import { PaymentToolComponent } from './payment-tool.component';
import { BankCardComponent } from './bank-card';
import { DigitalWalletComponent } from './digital-wallet';
import { PaymentTerminalComponent } from './payment-terminal';
import { DetailsItemModule } from '../../../details-item';
import { UtilsModule } from '../utils';

@NgModule({
    imports: [
        TranslocoModule,
        CardModule,
        ButtonModule,
        CommonModule,
        FlexModule,
        DetailsItemModule,
        MatIconModule,
        UtilsModule
    ],
    declarations: [PaymentToolComponent, BankCardComponent, DigitalWalletComponent, PaymentTerminalComponent],
    exports: [PaymentToolComponent]
})
export class PaymentToolModule {}
