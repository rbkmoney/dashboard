import { NgModule } from '@angular/core';
import { MatIconModule, MatDividerModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';

import { PayoutPanelComponent } from './payout-panel.component';
import { LayoutModule } from '../../../../layout';
import { ButtonModule } from '../../../../button';
import { DetailsItemModule } from '../../../../details-item';

@NgModule({
    imports: [
        LayoutModule,
        MatIconModule,
        ButtonModule,
        FlexLayoutModule,
        CommonModule,
        MatDividerModule,
        DetailsItemModule
    ],
    declarations: [PayoutPanelComponent],
    exports: [PayoutPanelComponent]
})
export class PayoutPanelModule {}
