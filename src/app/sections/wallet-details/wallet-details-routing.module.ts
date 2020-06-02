import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WalletDetailsComponent } from './wallet-details.component';

const walletDetailsRoutes: Routes = [
    {
        path: ':walletID',
        component: WalletDetailsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(walletDetailsRoutes)],
    exports: [RouterModule],
})
export class WalletDetailsRoutingModule {}
