import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IntegrationsComponent } from './integrations.component';

const ROUTES: Routes = [
    {
        path: '',
        component: IntegrationsComponent,
        children: [
            {
                path: 'webhooks',
                loadChildren: () => import('./webhooks/webhooks.module').then((m) => m.WebhooksModule),
            },
            {
                path: 'payment-link',
                loadChildren: () => import('./payment-link').then((m) => m.PaymentLinkModule),
            },
            {
                path: 'api-key',
                loadChildren: () => import('./api-key').then((m) => m.ApiKeyModule),
            },
            {
                path: '',
                redirectTo: 'payment-link',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class IntegrationsRoutingModule {}
