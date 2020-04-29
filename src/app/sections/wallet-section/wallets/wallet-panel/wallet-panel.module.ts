import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { DetailsItemModule, ExpandPanelModule } from '@dsh/components/layout';

import { ToMajorModule } from '../../../../to-major';
import { AccountComponent } from './account/account.component';
import { ActionsComponent } from './actions/actions.component';
import { DetailsComponent } from './details/details.component';
import { WalletPanelComponent } from './wallet-panel.component';

@NgModule({
    imports: [
        ExpandPanelModule,
        FlexModule,
        MatIconModule,
        ButtonModule,
        DetailsItemModule,
        MatDividerModule,
        TranslocoModule,
        CommonModule,
        ToMajorModule
    ],
    declarations: [WalletPanelComponent, ActionsComponent, AccountComponent, DetailsComponent],
    exports: [WalletPanelComponent]
})
export class WalletPanelModule {}
