import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AcceptInvitationComponent } from './accept-invitation.component';

const ROUTES: Routes = [{ path: ':token', component: AcceptInvitationComponent }];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class AcceptInvitationRoutingModule {}
