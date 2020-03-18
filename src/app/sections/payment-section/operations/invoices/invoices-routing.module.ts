import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InvoicesComponent } from './invoices.component';

const invoicesRoutes: Routes = [{ path: '', component: InvoicesComponent }];

@NgModule({
    imports: [RouterModule.forChild(invoicesRoutes)],
    exports: [RouterModule]
})
export class InvoicesRoutingModule {}
