import { NgModule } from '@angular/core';

import { InvoiceSearchService } from './invoice-search.service';
import { PaymentSearchService } from './payment-search.service';
import { PayoutSearchService } from './payout-search.service';
import { RefundSearchService } from './refund-search.service';

@NgModule({
    providers: [PaymentSearchService, RefundSearchService, InvoiceSearchService, PayoutSearchService],
})
export class SearchModule {}
