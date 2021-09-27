import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule, GridModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { TranslocoModule } from '@ngneat/transloco';

import { DepositsModule, WithdrawalsModule } from '@dsh/api';
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

import { WalletWithdrawalDetailsComponent } from './components';
import { WalletWithdrawalsComponent } from './wallet-withdrawals.component';

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
        WithdrawalsModule,
    ],
    declarations: [WalletWithdrawalsComponent, WalletWithdrawalDetailsComponent],
    exports: [WalletWithdrawalsComponent],
})
export class WalletWithdrawalsModule {}
