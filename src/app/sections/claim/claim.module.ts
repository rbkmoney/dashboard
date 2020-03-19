import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatInputModule } from '@angular/material';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { IndicatorsModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';
import { ConfirmActionDialogModule } from '@dsh/components/popups';

import { ClaimsModule, QuestionaryModule } from '../../api';
import { ClaimRoutingModule } from './claim-routing.module';
import { ClaimComponent } from './claim.component';
import { ConversationModule } from './conversation';
import { DocumentsModule } from './documents';
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
        DocumentsModule,
        TranslocoModule,
        IndicatorsModule,
        QuestionaryModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatInputModule,
        ConfirmActionDialogModule
    ],
    declarations: [ClaimComponent, RevokeClaimDialogComponent],
    entryComponents: [RevokeClaimDialogComponent]
})
export class ClaimModule {}
