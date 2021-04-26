import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WithdrawalsComponent } from './withdrawals.component';

const ROUTES: Routes = [
    {
        path: '',
        component: WithdrawalsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class WithdrawalsRoutingModule {}
