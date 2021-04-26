import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClaimsComponent } from './claims.component';

const ROUTES: Routes = [
    {
        path: '',
        component: ClaimsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class ClaimsRoutingModule {}
