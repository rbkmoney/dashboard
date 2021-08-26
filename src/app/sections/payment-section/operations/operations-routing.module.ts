import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OperationsComponent } from './operations.component';

const OPERATIONS_ROUTES: Routes = [
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
            {
                path: '',
                redirectTo: 'payments',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(OPERATIONS_ROUTES)],
    exports: [RouterModule],
})
export class OperationsRoutingModule {}
