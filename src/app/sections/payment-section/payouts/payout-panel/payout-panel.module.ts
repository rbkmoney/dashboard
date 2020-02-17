import { NgModule } from '@angular/core';
import { MatIconModule, MatDividerModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';

import { PayoutPanelComponent } from './payout-panel.component';
import { LayoutModule } from '../../../../layout';
import { ButtonModule } from '../../../../button';
import { DetailsItemModule } from '../../../../details-item';
import { FromMinorModule } from '../../../../from-minor';
import { BankAccountInfoComponent } from './bank-account-info';

@NgModule({
    imports: [
        LayoutModule,
        MatIconModule,
        FlexLayoutModule,
        CommonModule,
        MatDividerModule,
        DetailsItemModule,
        ButtonModule,
        TranslocoModule,
        FromMinorModule
    ],
    declarations: [PayoutPanelComponent, BankAccountInfoComponent],
    exports: [PayoutPanelComponent]
})
export class PayoutPanelModule {}
