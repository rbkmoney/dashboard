import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaymentSectionComponent } from './payment-section.component';

const paymentSectionRoutes: Routes = [
    {
        path: 'env/:envID',
        component: PaymentSectionComponent,
        children: [
            {
                path: 'analytics',
                loadChildren: () => import('./analytics/analytics.module').then(mod => mod.AnalyticsModule)
            },
            {
                path: 'operations',
                loadChildren: () => import('./operations/operations.module').then(mod => mod.OperationsModule)
            },
            {
                path: 'reports',
                loadChildren: () => import('./reports/reports.module').then(mod => mod.ReportsModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(paymentSectionRoutes)],
    exports: [RouterModule]
})
export class PaymentSectionRoutingModule {}
