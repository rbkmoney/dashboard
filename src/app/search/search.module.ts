import { NgModule } from '@angular/core';

import { PaymentSearchService } from './payment-search.service';
import { RefundSearchService } from './refund-search.service';

@NgModule({
    providers: [PaymentSearchService, RefundSearchService]
})
export class SearchModule {}
