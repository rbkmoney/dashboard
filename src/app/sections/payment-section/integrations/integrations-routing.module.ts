import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IntegrationsComponent } from './integrations.component';

const routes: Routes = [
    {
        path: '',
        component: IntegrationsComponent,
        children: [
            {
                path: 'webhooks',
                loadChildren: () => import('./webhooks/webhooks.module').then(m => m.WebhooksModule)
            },
            {
                path: 'shops',
                loadChildren: () => import('./shops').then(m => m.ShopsModule)
            },
            {
                path: 'payment-link',
                loadChildren: () => import('./payment-link').then(m => m.PaymentLinkModule)
            },
            {
                path: 'api-key',
                loadChildren: () => import('./api-key').then(m => m.ApiKeyModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class IntegrationsRoutingModule {}
