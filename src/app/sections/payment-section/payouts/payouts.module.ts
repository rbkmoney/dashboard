import { NgModule } from '@angular/core';

import { PayoutsComponent } from './payouts.component';
import { PayoutsRoutingModule } from './payouts-routing.module';

@NgModule({
    imports: [PayoutsRoutingModule],
    declarations: [PayoutsComponent],
    exports: [PayoutsComponent]
})
export class PayoutsModule {}
