import { NgModule } from '@angular/core';

import { PaymentSearchService } from './payment-search.service';
import { RefundSearchService } from './refund-search.service';
import { InvoiceSearchService } from './invoice-search.service';

@NgModule({
    providers: [PaymentSearchService, RefundSearchService, InvoiceSearchService]
})
export class SearchModule {}
