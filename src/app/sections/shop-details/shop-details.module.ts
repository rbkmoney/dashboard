import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { LayoutModule } from '@dsh/components/layout';

import { DetailsItemModule } from '../../details-item/details-item.module';
import { ShopDetailsComponent } from './shop-details.component';
import { ShopDetailsService } from './shop-details.service';
import { ShopLocationUrlComponent } from './shop-location-url';

@NgModule({
    imports: [CommonModule, FlexLayoutModule, TranslocoModule, LayoutModule, DetailsItemModule],
    declarations: [ShopDetailsComponent, ShopLocationUrlComponent],
    exports: [ShopDetailsComponent],
    providers: [ShopDetailsService]
})
export class ShopDetailsModule {}
