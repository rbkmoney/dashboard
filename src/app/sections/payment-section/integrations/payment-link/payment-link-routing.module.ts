import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaymentLinkComponent } from './payment-link.component';

const ROUTES: Routes = [
    {
        path: '',
        component: PaymentLinkComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
})
export class PaymentLinkRoutingModule {}
