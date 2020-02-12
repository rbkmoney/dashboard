import { NgModule } from '@angular/core';
import { MatCommonModule } from '@angular/material';
import { TranslocoModule } from '@ngneat/transloco';
import { FlexLayoutModule } from '@angular/flex-layout';

import { PayoutsComponent } from './payouts.component';
import { PayoutsRoutingModule } from './payouts-routing.module';
import { ButtonModule } from '../../../button';

@NgModule({
    imports: [PayoutsRoutingModule, MatCommonModule, FlexLayoutModule, ButtonModule, TranslocoModule],
    declarations: [PayoutsComponent],
    exports: [PayoutsComponent]
})
export class PayoutsModule {}
