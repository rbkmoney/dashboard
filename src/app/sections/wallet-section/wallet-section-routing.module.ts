import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WalletSectionComponent } from './wallet-section.component';

const paymentSectionRoutes: Routes = [
    {
        path: '',
        component: WalletSectionComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(paymentSectionRoutes)],
    exports: [RouterModule]
})
export class WalletSectionRoutingModule {}
