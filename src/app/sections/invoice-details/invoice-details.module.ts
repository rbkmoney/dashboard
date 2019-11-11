import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceDetailsComponent } from './invoice-details.component';
import { InvoiceDetailsRoutingModule } from './invoice-details-routing.module';
import { InvoiceSearchService } from '../../api/search';
import { ShopDetailsModule } from '../shop-details/shop-details.module';

@NgModule({
    imports: [CommonModule, ShopDetailsModule, InvoiceDetailsRoutingModule],
    declarations: [InvoiceDetailsComponent],
    providers: [InvoiceSearchService]
})
export class InvoiceDetailsModule {}
