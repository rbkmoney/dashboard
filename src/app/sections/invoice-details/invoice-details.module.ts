import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceDetailsComponent } from './invoice-details.component';
import { InvoiceDetailsRoutingModule } from './invoice-details-routing.module';

@NgModule({
    imports: [CommonModule, InvoiceDetailsRoutingModule],
    declarations: [InvoiceDetailsComponent]
})
export class InvoiceDetailsModule {}
