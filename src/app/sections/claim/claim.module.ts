import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatInputModule } from '@angular/material';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { StatusModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';

import { DshTabsModule } from '../../../components/layout/tabs';
import { ClaimsModule, QuestionaryModule } from '../../api';
import { ConfirmActionDialogModule } from '../../confirm-action-dialog';
import { SpinnerModule } from '../../spinner';
import { ClaimRoutingModule } from './claim-routing.module';
import { ClaimComponent } from './claim.component';
import { ConversationModule } from './conversation';
import { DocumentsModule } from './documents';
import { RevokeClaimDialogComponent } from './revoke-claim-dialog';

@NgModule({
    imports: [
        CommonModule,
        LayoutModule,
        DshTabsModule,
        ButtonModule,
        FlexLayoutModule,
        ClaimsModule,
        ClaimRoutingModule,
        ConversationModule,
        StatusModule,
        DocumentsModule,
        TranslocoModule,
        SpinnerModule,
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
