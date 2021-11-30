import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WalletSectionComponent } from './wallet-section.component';

const WALLET_SECTION_ROUTES: Routes = [
    {
        path: '',
        component: WalletSectionComponent,
        children: [
            {
                path: 'wallets',
                loadChildren: () => import('./wallets').then((m) => m.WalletsModule),
            },
            {
                path: 'deposits',
                loadChildren: () => import('./deposits').then((m) => m.DepositsModule),
            },
            {
                path: 'withdrawals',
                loadChildren: () => import('./withdrawals').then((m) => m.WithdrawalsModule),
            },
            {
                path: 'integrations',
                loadChildren: () => import('./integrations').then((m) => m.IntegrationsModule),
            },
            {
                path: '',
                redirectTo: 'wallets',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(WALLET_SECTION_ROUTES)],
    exports: [RouterModule],
})
export class WalletSectionRoutingModule {}
