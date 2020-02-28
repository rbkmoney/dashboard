import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnalyticsComponent } from './analytics.component';

const operationsRoutes: Routes = [
    {
        path: '',
        component: AnalyticsComponent,
        children: [
            {
                path: 'analytics',
                loadChildren: () => import('./analytics.module').then(mod => mod.AnalyticsModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(operationsRoutes)],
    exports: [RouterModule]
})
export class AnalyticsRoutingModule {}
