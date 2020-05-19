import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RefundsComponent } from './refunds.component';

const refundsRoutes: Routes = [{ path: '', component: RefundsComponent }];

@NgModule({
    imports: [RouterModule.forChild(refundsRoutes)],
    exports: [RouterModule],
})
export class RefundsRoutingModule {}
