import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main';
import { PageNotFoundComponent } from './page-not-found';
import { AnalyticsComponent } from './analytics';
import { routes as onboargindRoutes } from './onboarding';
import { routes as claimRoutes } from './claim';
import { ButtonsComponent } from './buttons';
import { OperationsComponent } from './operations/operations.component';
import { InputsComponent } from './inputs/inputs.component';
import { PaymentsComponent } from './operations/payments/payments.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent
    },
    ...onboargindRoutes,
    ...claimRoutes,
    {
        path: 'analytics',
        component: AnalyticsComponent
    },
    {
        path: 'buttons',
        component: ButtonsComponent
    },
    {
        path: 'operations',
        component: OperationsComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'payments'
            },
            {
                path: 'payments',
                component: PaymentsComponent
            },
            {
                path: 'refunds',
                component: PaymentsComponent
            },
            {
                path: 'invoices',
                component: PaymentsComponent
            }
        ]
    },
    {
        path: 'inputs',
        component: InputsComponent
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class SectionsRoutingModule {}
