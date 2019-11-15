import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { ShopDetailsComponent } from './shop-details.component';
import { ShopLocationUrlComponent } from './shop-location-url';
import { ShopDetailsService } from './shop-details.service';
import { CardModule } from '../../layout/card';
import { DetailsItemModule } from '../../details-item/details-item.module';

@NgModule({
    imports: [CommonModule, FlexLayoutModule, TranslocoModule, CardModule, DetailsItemModule],
    declarations: [ShopDetailsComponent, ShopLocationUrlComponent],
    exports: [ShopDetailsComponent],
    providers: [ShopDetailsService]
})
export class ShopDetailsModule {}
