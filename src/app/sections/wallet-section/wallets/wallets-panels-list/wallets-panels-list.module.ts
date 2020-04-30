import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { ExpandPanelModule } from '@dsh/components/layout';

import { WalletPanelModule } from './wallet-panel/wallet-panel.module';
import { WalletsPanelsListComponent } from './wallets-panels-list.component';

@NgModule({
    imports: [FlexModule, TranslocoModule, CommonModule, WalletPanelModule, ExpandPanelModule],
    declarations: [WalletsPanelsListComponent],
    exports: [WalletsPanelsListComponent]
})
export class WalletsPanelsListModule {}
