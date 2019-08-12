import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoicesComponent } from './invoices.component';

const refundsRoutes: Routes = [{ path: '', component: InvoicesComponent }];

@NgModule({
    imports: [RouterModule.forChild(refundsRoutes)],
    exports: [RouterModule]
})
export class InvoicesRoutingModule {}
