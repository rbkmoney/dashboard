import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaymentSectionComponent } from './payment-section.component';

const paymentSectionRoutes: Routes = [
    {
        path: '',
        component: PaymentSectionComponent,
        children: [
            {
                path: 'operations',
                loadChildren: () => import('./operations/operations.module').then(mod => mod.OperationsModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(paymentSectionRoutes)],
    exports: [RouterModule]
})
export class PaymentSectionRoutingModule {}
