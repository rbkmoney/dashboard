import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';

import { SpinnerModule } from '@dsh/components/indicators';

import { AccountInfoModule } from './account-info';
import { DepositsModule } from './deposits';
import { DetailsModule } from './details';
import { WalletDetailsHeadlineModule } from './wallet-details-headline/wallet-details-headline.module';
import { WalletDetailsRoutingModule } from './wallet-details-routing.module';
import { WalletDetailsComponent } from './wallet-details.component';
import { WithdrawalsModule } from './withdrawals';

@NgModule({
    imports: [
        CommonModule,
        SpinnerModule,
        FlexModule,
        DetailsModule,
        AccountInfoModule,
        DepositsModule,
        WithdrawalsModule,
        WalletDetailsRoutingModule,
        WalletDetailsHeadlineModule,
    ],
    declarations: [WalletDetailsComponent],
})
export class WalletDetailsModule {}
