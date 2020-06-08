import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';

import { DetailsItemModule, ExpandPanelModule } from '@dsh/components/layout';

import { ToMajorModule } from '../../../../to-major';
import { AccountComponent } from './account/account.component';
import { ActionsComponent } from './actions/actions.component';
import { DetailsComponent } from './details/details.component';
import { WalletsPanelsListComponent } from './wallets-panels-list.component';

@NgModule({
    imports: [
        FlexModule,
        TranslocoModule,
        CommonModule,
        ExpandPanelModule,
        MatDividerModule,
        ToMajorModule,
        DetailsItemModule,
        MatIconModule,
    ],
    declarations: [WalletsPanelsListComponent, ActionsComponent, AccountComponent, DetailsComponent],
    exports: [WalletsPanelsListComponent],
})
export class WalletsPanelsListModule {}
