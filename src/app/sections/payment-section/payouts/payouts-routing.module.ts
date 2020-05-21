import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PayoutsComponent } from './payouts.component';

const routes: Routes = [
    {
        path: '',
        component: PayoutsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PayoutsRoutingModule {}
