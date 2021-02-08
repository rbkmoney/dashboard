import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { TranslocoModule } from '@ngneat/transloco';

import { ClaimsModule } from '@dsh/api/claims';
import { QuestionaryModule } from '@dsh/api/questionary';
import { ButtonModule } from '@dsh/components/buttons';
import { IndicatorsModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';
import { ConfirmActionDialogModule } from '@dsh/components/popups';

import { ClaimRoutingModule } from './claim-routing.module';
import { ClaimComponent } from './claim.component';
import { ConversationModule } from './conversation';
import { RevokeClaimDialogComponent } from './revoke-claim-dialog';

@NgModule({
    imports: [
        CommonModule,
        LayoutModule,
        ButtonModule,
        FlexLayoutModule,
        ClaimsModule,
        ClaimRoutingModule,
        ConversationModule,
        TranslocoModule,
        IndicatorsModule,
        QuestionaryModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatInputModule,
        ConfirmActionDialogModule,
    ],
    declarations: [ClaimComponent, RevokeClaimDialogComponent],
})
export class ClaimModule {}
