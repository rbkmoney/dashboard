import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InvoicesComponent } from './invoices.component';

const INVOICES_ROUTES: Routes = [{ path: '', component: InvoicesComponent }];

@NgModule({
    imports: [RouterModule.forChild(INVOICES_ROUTES)],
    exports: [RouterModule],
})
export class InvoicesRoutingModule {}
