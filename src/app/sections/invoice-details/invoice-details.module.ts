import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { InvoiceDetailsComponent } from './invoice-details.component';
import { InvoiceDetailsRoutingModule } from './invoice-details-routing.module';
import { InvoiceSearchService } from '../../api/search';
import { ShopDetailsModule } from '../shop-details/shop-details.module';
import { SpinnerModule } from '../../spinner';
import { LayoutModule } from '../../layout';
import { StatusDetailsItemComponent } from './details/status-details-item';
import { DetailsItemModule } from '../../details-item/details-item.module';
import { StatusModule } from '../../status';
import { DetailsComponent } from './details/details.component';

@NgModule({
    imports: [
        CommonModule,
        ShopDetailsModule,
        SpinnerModule,
        FlexLayoutModule,
        LayoutModule,
        TranslocoModule,
        DetailsItemModule,
        StatusModule,
        InvoiceDetailsRoutingModule
    ],
    declarations: [InvoiceDetailsComponent, StatusDetailsItemComponent, DetailsComponent],
    providers: [InvoiceSearchService]
})
export class InvoiceDetailsModule {}
