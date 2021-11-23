import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaymentSectionComponent } from './payment-section.component';

const PAYMENT_SECTION_ROUTES: Routes = [
    {
        path: '',
        component: PaymentSectionComponent,
    },
    {
        path: 'realm/:realm',
        component: PaymentSectionComponent,
        children: [
            {
                path: 'shops',
                loadChildren: () => import('./shops').then((m) => m.ShopsModule),
            },
            {
                path: 'analytics',
                loadChildren: () => import('./analytics/analytics.module').then((m) => m.AnalyticsModule),
            },
            {
                path: 'operations',
                loadChildren: () => import('./operations/operations.module').then((m) => m.OperationsModule),
            },
            {
                path: 'reports',
                loadChildren: () => import('./reports/reports.module').then((m) => m.ReportsModule),
            },
            {
                path: 'payouts',
                loadChildren: () => import('./payouts/payouts.module').then((m) => m.PayoutsModule),
            },
            {
                path: 'integrations',
                loadChildren: () => import('./integrations/integrations.module').then((m) => m.IntegrationsModule),
            },
            {
                path: '',
                redirectTo: 'shops',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(PAYMENT_SECTION_ROUTES)],
    exports: [RouterModule],
})
export class PaymentSectionRoutingModule {}
