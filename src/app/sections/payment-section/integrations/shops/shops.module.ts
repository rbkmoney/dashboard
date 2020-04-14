import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { ShopsPanelsListModule } from './shops-panels-list';
import { ShopsRoutingModule } from './shops-routing.module';
import { ShopsComponent } from './shops.component';

@NgModule({
    imports: [ShopsRoutingModule, FlexLayoutModule, TranslocoModule, ShopsPanelsListModule],
    declarations: [ShopsComponent],
    exports: [ShopsComponent]
})
export class ShopsModule {}
