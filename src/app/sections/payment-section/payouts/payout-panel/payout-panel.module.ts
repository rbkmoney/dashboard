import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';

import { PayoutPanelComponent } from './payout-panel.component';
import { LayoutModule } from '../../../../layout';
import { ButtonModule } from '../../../../button';

@NgModule({
    imports: [LayoutModule, MatIconModule, ButtonModule],
    declarations: [PayoutPanelComponent],
    exports: [PayoutPanelComponent]
})
export class PayoutPanelModule {}
