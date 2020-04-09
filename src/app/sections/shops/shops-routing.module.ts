import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShopsComponent } from './shops.component';

const reportDetailsRoutes: Routes = [
    {
        path: '',
        component: ShopsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(reportDetailsRoutes)],
    exports: [RouterModule]
})
export class ShopsRoutingModule {}
