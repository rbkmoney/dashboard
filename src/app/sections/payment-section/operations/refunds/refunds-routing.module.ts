import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RefundsComponent } from './refunds.component';

const REFUNDS_ROUTES: Routes = [{ path: '', component: RefundsComponent }];

@NgModule({
    imports: [RouterModule.forChild(REFUNDS_ROUTES)],
    exports: [RouterModule],
})
export class RefundsRoutingModule {}
