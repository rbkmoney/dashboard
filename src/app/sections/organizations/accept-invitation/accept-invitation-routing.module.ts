import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AcceptInvitationComponent } from './accept-invitation.component';

const routes: Routes = [{ path: ':token', component: AcceptInvitationComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AcceptInvitationRoutingModule {}
