import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WalletsComponent } from './wallets.component';

const ROUTES: Routes = [
    {
        path: '',
        component: WalletsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class WalletsRoutingModule {}
