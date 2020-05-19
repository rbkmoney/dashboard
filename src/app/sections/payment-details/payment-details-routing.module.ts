import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaymentDetailsComponent } from './payment-details.component';

const paymentDetailsRoutes: Routes = [
    {
        path: ':paymentID',
        component: PaymentDetailsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(paymentDetailsRoutes)],
    exports: [RouterModule],
})
export class PaymentDetailsRoutingModule {}
