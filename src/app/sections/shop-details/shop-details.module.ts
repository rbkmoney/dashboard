import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { DetailsItemModule } from '../../details-item/details-item.module';
import { CardModule } from '../../layout/card';
import { ShopDetailsComponent } from './shop-details.component';
import { ShopDetailsService } from './shop-details.service';
import { ShopLocationUrlComponent } from './shop-location-url';

@NgModule({
    imports: [CommonModule, FlexLayoutModule, TranslocoModule, CardModule, DetailsItemModule],
    declarations: [ShopDetailsComponent, ShopLocationUrlComponent],
    exports: [ShopDetailsComponent],
    providers: [ShopDetailsService]
})
export class ShopDetailsModule {}
