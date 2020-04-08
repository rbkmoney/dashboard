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
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class IntegrationsRoutingModule {}
