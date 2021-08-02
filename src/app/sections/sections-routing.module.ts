import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
    {
        path: '',
        loadChildren: () => import('./landing').then((m) => m.LandingModule),
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
        path: 'onboarding',
        loadChildren: () => import('./onboarding').then((m) => m.OnboardingModule),
    },
    {
        path: 'organizations',
        loadChildren: () => import('./organizations').then((m) => m.OrganizationsModule),
    },
    {
        path: 'organization/:orgId',
        loadChildren: () => import('./organization-details').then((m) => m.OrganizationDetailsModule),
    },
    {
        path: '**',
        loadChildren: () => import('./page-not-found').then((m) => m.PageNotFoundModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES, { paramsInheritanceStrategy: 'always', relativeLinkResolution: 'legacy' })],
    exports: [RouterModule],
})
export class SectionsRoutingModule {}
