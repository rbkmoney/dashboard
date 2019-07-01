import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RefundsComponent } from './refunds.component';

const refundsRoutes: Routes = [{ path: '', component: RefundsComponent }];

@NgModule({
    imports: [RouterModule.forChild(refundsRoutes)],
    exports: [RouterModule]
})
export class RefundsRoutingModule {}
