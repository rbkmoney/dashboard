import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { ErrorModule } from '@dsh/app/shared';
import { ButtonModule } from '@dsh/components/buttons';
import { IndicatorsModule } from '@dsh/components/indicators';
import { LinkModule } from '@dsh/components/link';

import { AcceptInvitationRoutingModule } from './accept-invitation-routing.module';
import { AcceptInvitationComponent } from './accept-invitation.component';

@NgModule({
    imports: [
        CommonModule,
        AcceptInvitationRoutingModule,
        ErrorModule,
        TranslocoModule,
        ButtonModule,
        FlexModule,
        IndicatorsModule,
        LinkModule,
    ],
    declarations: [AcceptInvitationComponent],
    exports: [AcceptInvitationComponent],
})
export class AcceptInvitationModule {}
