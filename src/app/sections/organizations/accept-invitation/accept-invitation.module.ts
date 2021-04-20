import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

import { ErrorModule } from '@dsh/app/shared';
import { ButtonModule } from '@dsh/components/buttons';

import { AcceptInvitationRoutingModule } from './accept-invitation-routing.module';
import { AcceptInvitationComponent } from './accept-invitation.component';

@NgModule({
    imports: [CommonModule, AcceptInvitationRoutingModule, ErrorModule, TranslocoModule, ButtonModule],
    declarations: [AcceptInvitationComponent],
    exports: [AcceptInvitationComponent],
})
export class AcceptInvitationModule {}
