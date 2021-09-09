import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { TranslocoModule } from '@ngneat/transloco';

import { LastUpdatedModule } from '@dsh/components/indicators/last-updated/last-updated.module';
import { AccordionModule, CardModule, ExpandPanelModule, RowModule } from '@dsh/components/layout';

import { WalletRowComponent, WalletRowHeaderComponent, WalletDetailsComponent } from './components';
import { WalletsAccountInfoModule } from './wallet-account-info';
import { WalletsMainInfoModule } from './wallet-main-info';
import { WalletsListComponent } from './wallets-list.component';

@NgModule({
    imports: [
        TranslocoModule,
        CommonModule,
        FlexModule,
        MatDividerModule,
        LastUpdatedModule,
        AccordionModule,
        ExpandPanelModule,
        CardModule,
        RowModule,
        WalletsMainInfoModule,
        WalletsAccountInfoModule,
    ],
    declarations: [WalletsListComponent, WalletRowHeaderComponent, WalletRowComponent, WalletDetailsComponent],
    exports: [WalletsListComponent],
})
export class WalletsListModule {}
