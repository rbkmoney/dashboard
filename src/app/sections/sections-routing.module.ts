import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
    {
        path: 'claim-section',
        loadChildren: () => import('./claim-section').then((m) => m.ClaimSectionModule),
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
        path: 'organization-section',
        loadChildren: () => import('./organization-section').then((m) => m.OrginizationSectionModule),
    },
    {
        path: '',
        redirectTo: 'payment-section',
        pathMatch: 'full',
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
