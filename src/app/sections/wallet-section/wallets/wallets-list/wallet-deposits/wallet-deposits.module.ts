import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule, GridModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { TranslocoModule } from '@ngneat/transloco';

import { DepositsModule } from '@dsh/api';
import { ApiModelTypesModule, ToMajorModule } from '@dsh/app/shared';
import { ButtonModule } from '@dsh/components/buttons';
import { StatusModule, TextColorModule } from '@dsh/components/indicators';
import { AccordionModule, CollapseModule, DetailsItemModule, RowModule } from '@dsh/components/layout';
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
})
export class WalletDepositsModule {}
