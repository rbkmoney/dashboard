import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WalletSectionComponent } from './wallet-section.component';

const paymentSectionRoutes: Routes = [
    {
        path: '',
        component: WalletSectionComponent,
        children: [
            {
                path: 'wallets',
                loadChildren: () => import('./wallets/wallets.module').then(m => m.WalletsModule)
            },
            {
                path: '',
                redirectTo: 'wallets'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(paymentSectionRoutes)],
    exports: [RouterModule]
})
export class WalletSectionRoutingModule {}
