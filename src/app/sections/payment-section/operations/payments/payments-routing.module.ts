import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaymentsComponent } from './payments.component';

const PAYMENTS_ROUTES: Routes = [{ path: '', component: PaymentsComponent }];

@NgModule({
    imports: [RouterModule.forChild(PAYMENTS_ROUTES)],
    exports: [RouterModule],
})
export class PaymentsRoutingModule {}
