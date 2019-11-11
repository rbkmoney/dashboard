import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceDetailsComponent } from './invoice-details.component';
import { InvoiceDetailsRoutingModule } from './invoice-details-routing.module';
import { InvoiceModule } from '../../api/invoice';

@NgModule({
    imports: [CommonModule, InvoiceModule, InvoiceDetailsRoutingModule],
    declarations: [InvoiceDetailsComponent]
})
export class InvoiceDetailsModule {}
