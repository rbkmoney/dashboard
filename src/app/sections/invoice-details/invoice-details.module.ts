import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceDetailsComponent } from './invoice-details.component';
import { InvoiceDetailsRoutingModule } from './invoice-details-routing.module';
import { InvoiceSearchService } from '../../api/search';

@NgModule({
    imports: [CommonModule, InvoiceDetailsRoutingModule],
    declarations: [InvoiceDetailsComponent],
    providers: [InvoiceSearchService]
})
export class InvoiceDetailsModule {}
