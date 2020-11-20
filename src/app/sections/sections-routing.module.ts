import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
    },
    {
        path: 'claims',
        loadChildren: () => import('./claims').then((m) => m.ClaimsModule),
    },
    {
        path: 'claim',
        loadChildren: () => import('./claim').then((m) => m.ClaimModule),
    },
    {
        path: 'payment-section',
        loadChildren: () => import('./payment-section').then((m) => m.PaymentSectionModule),
    },
    {
        path: 'wallet-section',
        loadChildren: () => import('./wallet-section').then((m) => m.WalletSectionModule),
    },
    {
        path: 'wallet',
        loadChildren: () => import('./wallet-details').then((m) => m.WalletDetailsModule),
    },
    {
        path: 'invoice/:invoiceID/payment',
        loadChildren: () => import('./payment-details').then((m) => m.PaymentDetailsModule),
    },
    {
        path: 'invoice',
        loadChildren: () => import('./invoice-details').then((m) => m.InvoiceDetailsModule),
    },
    {
        path: 'onboarding',
        loadChildren: () => import('./onboarding').then((m) => m.OnboardingModule),
    },
    {
        path: 'organizations',
        loadChildren: () => import('./organizations').then((m) => m.OrganizationsModule),
    },
    {
        path: '**',
        loadChildren: () => import('./page-not-found').then((m) => m.PageNotFoundModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { paramsInheritanceStrategy: 'always' })],
    exports: [RouterModule],
})
export class SectionsRoutingModule {}
