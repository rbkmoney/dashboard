import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WalletDetailsComponent } from './wallet-details.component';

const WALLET_DETAILS_ROUTES: Routes = [
    {
        path: ':walletID',
        component: WalletDetailsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(WALLET_DETAILS_ROUTES)],
    exports: [RouterModule],
})
export class WalletDetailsRoutingModule {}
