import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClaimSearchComponent } from './claim-search.component';

const paymentDetailsRoutes: Routes = [
    {
        path: '',
        component: ClaimSearchComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(paymentDetailsRoutes)],
    exports: [RouterModule]
})
export class ClaimSearchRoutingModule {}
