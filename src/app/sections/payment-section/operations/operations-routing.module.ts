import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OperationsComponent } from './operations.component';

const operationsRoutes: Routes = [
    {
        path: '',
        component: OperationsComponent,
        children: [
            {
                path: 'payments',
                loadChildren: () => import('./payments/payments.module').then(mod => mod.PaymentsModule)
            },
            {
                path: 'refunds',
                loadChildren: () => import('./refunds/refunds.module').then(mod => mod.RefundsModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(operationsRoutes)],
    exports: [RouterModule]
})
export class OperationsRoutingModule {}
