import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { LastUpdatedModule } from '@dsh/components/indicators/last-updated/last-updated.module';
import { AccordionModule, CardModule, ExpandPanelModule, RowModule } from '@dsh/components/layout';

import { WalletRowComponent, WalletRowHeaderComponent } from './components';
import { WalletsListComponent } from './wallets-list.component';

@NgModule({
    imports: [
        TranslocoModule,
        CommonModule,
        FlexModule,
        LastUpdatedModule,
        AccordionModule,
        ExpandPanelModule,
        CardModule,
        RowModule,
    ],
    declarations: [WalletsListComponent, WalletRowHeaderComponent, WalletRowComponent],
    exports: [WalletsListComponent],
})
export class WalletsListModule {}
