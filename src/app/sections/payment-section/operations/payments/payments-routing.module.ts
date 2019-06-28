import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentsComponent } from './payments.component';

const paymentsRoutes: Routes = [{ path: '', component: PaymentsComponent }];

@NgModule({
    imports: [RouterModule.forChild(paymentsRoutes)],
    exports: [RouterModule]
})
export class PaymentsRoutingModule {}
