import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DepositsComponent } from './deposits.component';

const ROUTES: Routes = [
    {
        path: '',
        component: DepositsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class DepositsRoutingModule {}
