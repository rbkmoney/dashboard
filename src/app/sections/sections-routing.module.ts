import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main';

const routes: Routes = [
    {
        path: '',
        component: MainComponent
    },
    {
        path: 'claim',
        loadChildren: () => import('./claim').then(m => m.ClaimModule)
    },
    {
        path: 'payment-section',
        loadChildren: () => import('./payment-section').then(m => m.PaymentSectionModule)
    },
    {
        path: 'invoice/:invoiceID/payment',
        loadChildren: () => import('./payment-details').then(m => m.PaymentDetailsModule)
    },
    {
        path: 'invoice',
        loadChildren: () => import('./invoice-details').then(m => m.InvoiceDetailsModule)
    },
    {
        path: 'report',
        loadChildren: () => import('./report-details').then(m => m.ReportDetailsModule)
    },
    {
        path: 'onboarding',
        loadChildren: () => import('./onboarding').then(m => m.OnboardingModule)
    },
    {
        path: '**',
        loadChildren: () => import('./page-not-found').then(m => m.PageNotFoundModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { paramsInheritanceStrategy: 'always' })],
    exports: [RouterModule]
})
export class SectionsRoutingModule {}
