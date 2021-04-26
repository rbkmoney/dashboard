import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShopsComponent } from './shops.component';

const ROUTES: Routes = [
    {
        path: '',
        component: ShopsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
})
export class ShopsRoutingModule {}
