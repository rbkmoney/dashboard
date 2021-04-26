import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaymentDetailsComponent } from './payment-details.component';

const PAYMENT_DETAILS_ROUTES: Routes = [
    {
        path: ':paymentID',
        component: PaymentDetailsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(PAYMENT_DETAILS_ROUTES)],
    exports: [RouterModule],
})
export class PaymentDetailsRoutingModule {}
