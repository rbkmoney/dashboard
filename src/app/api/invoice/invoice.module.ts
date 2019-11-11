import { NgModule } from '@angular/core';

import { InvoiceService } from './invoice.service';
import { InvoiceSearchService } from '../search';

@NgModule({
    providers: [InvoiceService, InvoiceSearchService]
})
export class InvoiceModule {}
