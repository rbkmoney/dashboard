import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatInputModule } from '@angular/material';
import { TranslocoModule } from '@ngneat/transloco';

import { ClaimsModule, QuestionaryModule } from '../../api';
import { ButtonModule } from '../../button';
import { ConfirmActionDialogModule } from '../../confirm-action-dialog';
import { LayoutModule } from '../../layout';
import { DshTabsModule } from '../../layout/tabs';
import { SpinnerModule } from '../../spinner';
import { StatusModule } from '../../status';
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
