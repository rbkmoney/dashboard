import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MembersComponent } from './members.component';

const ROUTES: Routes = [{ path: '', component: MembersComponent }];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class MembersRoutingModule {}
