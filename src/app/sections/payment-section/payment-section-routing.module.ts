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
                loadChildren: () => import('./operations/operations.module').then(m => m.OperationsModule)
            },
            {
                path: 'reports',
                loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule)
            },
            {
                path: 'payouts',
                loadChildren: () => import('./payouts/payouts.module').then(m => m.PayoutsModule)
            },
            {
                path: 'integrations',
                loadChildren: () => import('./integrations/integrations.module').then(m => m.IntegrationsModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(paymentSectionRoutes)],
    exports: [RouterModule]
})
export class PaymentSectionRoutingModule {}
