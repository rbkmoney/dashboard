import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaymentLinkComponent } from './payment-link.component';

const routes: Routes = [
    {
        path: '',
        component: PaymentLinkComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class PaymentLinkRoutingModule {}
