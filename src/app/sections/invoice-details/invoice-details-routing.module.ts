import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InvoiceDetailsComponent } from './invoice-details.component';

const INVOICE_DETAILS_ROUTES: Routes = [
    {
        path: ':invoiceID',
        component: InvoiceDetailsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(INVOICE_DETAILS_ROUTES)],
    exports: [RouterModule],
})
export class InvoiceDetailsRoutingModule {}
