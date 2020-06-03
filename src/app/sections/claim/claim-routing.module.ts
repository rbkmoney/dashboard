import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClaimComponent } from './claim.component';

const claimRoutes: Routes = [
    {
        path: ':claimId',
        component: ClaimComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(claimRoutes)],
    exports: [RouterModule],
})
export class ClaimRoutingModule {}
