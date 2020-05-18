import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OperationsComponent } from './operations.component';

const operationsRoutes: Routes = [
    {
        path: '',
        component: OperationsComponent,
        children: [
            {
                path: 'payments',
                loadChildren: () => import('./payments/payments.module').then((mod) => mod.PaymentsModule),
            },
            {
                path: 'refunds',
                loadChildren: () => import('./refunds/refunds.module').then((mod) => mod.RefundsModule),
            },
            {
                path: 'invoices',
                loadChildren: () => import('./invoices/invoices.module').then((mod) => mod.InvoicesModule),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(operationsRoutes)],
    exports: [RouterModule],
})
export class OperationsRoutingModule {}
