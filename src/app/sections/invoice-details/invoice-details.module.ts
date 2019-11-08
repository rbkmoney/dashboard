import { NgModule } from '@angular/core';

import { InvoiceDetailsComponent } from './invoice-details.component';
import { InvoiceDetailsRoutingModule } from './invoice-details-routing.module';

@NgModule({
    imports: [InvoiceDetailsRoutingModule],
    declarations: [InvoiceDetailsComponent],
    exports: [InvoiceDetailsComponent]
})
export class InvoiceDetailsModule {}
