import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaymentSectionComponent } from './payment-section.component';

const paymentSectionRoutes: Routes = [
    {
        path: 'env/:envID',
        component: PaymentSectionComponent,
        children: [
            {
                path: 'operations',
                loadChildren: () => import('./operations/operations.module').then(mod => mod.OperationsModule)
            },
            {
                path: 'reports',
                loadChildren: () => import('./reports/reports.module').then(mod => mod.ReportsModule)
            },
            {
                path: 'payouts',
                loadChildren: () => import('./payouts/payouts.module').then(mod => mod.PayoutsModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(paymentSectionRoutes)],
    exports: [RouterModule]
})
export class PaymentSectionRoutingModule {}
