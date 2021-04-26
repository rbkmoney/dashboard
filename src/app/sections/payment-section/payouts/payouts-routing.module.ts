import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PayoutsComponent } from './payouts.component';

const ROUTES: Routes = [
    {
        path: '',
        component: PayoutsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class PayoutsRoutingModule {}
