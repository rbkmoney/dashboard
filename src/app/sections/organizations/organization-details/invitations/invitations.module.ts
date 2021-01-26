import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { InvitationsRoutingModule } from './invitations-routing.module';
import { InvitationsComponent } from './invitations.component';

@NgModule({
    imports: [CommonModule, InvitationsRoutingModule],
    declarations: [InvitationsComponent],
    exports: [InvitationsComponent],
})
export class InvitationsModule {}
