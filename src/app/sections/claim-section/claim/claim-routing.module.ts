import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClaimComponent } from './claim.component';

const CLAIM_ROUTES: Routes = [
    {
        path: '',
        component: ClaimComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(CLAIM_ROUTES)],
    exports: [RouterModule],
})
export class ClaimRoutingModule {}
