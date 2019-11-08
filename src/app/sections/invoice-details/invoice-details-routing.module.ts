import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InvoiceDetailsComponent } from './invoice-details.component';

const invoiceDetailsRoutes: Routes = [
    {
        path: ':invoiceID',
        component: InvoiceDetailsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(invoiceDetailsRoutes)],
    exports: [RouterModule]
})
export class InvoiceDetailsRoutingModule {}
