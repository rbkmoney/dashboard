import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule, GridModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { TranslocoModule } from '@ngneat/transloco';

import { DepositsModule } from '@dsh/api';
import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';
import { ApiModelTypesModule, ToMajorModule } from '@dsh/app/shared';
import { ButtonModule } from '@dsh/components/buttons';
import { StatusModule, TextColorModule } from '@dsh/components/indicators';
import {
    AccordionModule,
    CollapseModule,
    DetailsItemModule,
    ExpandPanelModule,
    RowModule,
} from '@dsh/components/layout';
import { ShowMorePanelModule } from '@dsh/components/show-more-panel';

import { WalletDepositDetailsComponent } from './components';
import { WalletDepositsComponent } from './wallet-deposits.component';

@NgModule({
    imports: [
        CommonModule,
        FlexModule,
        DetailsItemModule,
        TranslocoModule,
        AccordionModule,
        ExpandPanelModule,
        RowModule,
        CollapseModule,
        DepositsModule,
        MatDividerModule,
        TextColorModule,
        GridModule,
        ToMajorModule,
        StatusModule,
        ApiModelTypesModule,
        ShowMorePanelModule,
        ButtonModule,
    ],
    declarations: [WalletDepositsComponent, WalletDepositDetailsComponent],
    exports: [WalletDepositsComponent],
    providers: [{ provide: SEARCH_LIMIT, useValue: 3 }],
})
export class WalletDepositsModule {}
