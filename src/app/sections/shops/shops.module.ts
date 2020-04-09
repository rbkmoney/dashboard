import { NgModule } from '@angular/core';

import { ShopsRoutingModule } from './shops-routing.module';
import { ShopsComponent } from './shops.component';

@NgModule({
    imports: [ShopsRoutingModule],
    declarations: [ShopsComponent],
    exports: [ShopsComponent]
})
export class ShopsModule {}
