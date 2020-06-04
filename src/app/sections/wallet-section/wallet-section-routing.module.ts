import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WalletSectionComponent } from './wallet-section.component';

const walletSectionRoutes: Routes = [
    {
        path: '',
        component: WalletSectionComponent,
        children: [
            {
                path: 'wallets',
                loadChildren: () => import('./wallets/wallets.module').then((m) => m.WalletsModule),
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
                path: '',
                redirectTo: 'wallets',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(walletSectionRoutes)],
    exports: [RouterModule],
})
export class WalletSectionRoutingModule {}
