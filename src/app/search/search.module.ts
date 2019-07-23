import { NgModule } from '@angular/core';

import { PaymentSearchService } from './payment-search.service';
import { RefundSearchService } from './refund-search.service';

@NgModule({
    imports: [],
    exports: [],
    providers: [PaymentSearchService, RefundSearchService]
})
export class SearchModule {}
