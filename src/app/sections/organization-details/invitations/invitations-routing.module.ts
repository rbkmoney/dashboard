import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InvitationsComponent } from './invitations.component';

const ROUTES: Routes = [{ path: '', component: InvitationsComponent }];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class InvitationsRoutingModule {}
