import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatInputModule } from '@angular/material';

import { LayoutModule } from '../../layout';
import { ButtonModule } from '../../button';
import { DshTabsModule } from '../../layout/tabs';
import { ClaimRoutingModule } from './claim-routing.module';
import { ClaimComponent } from './claim.component';
import { ClaimsModule } from '../../api/claims';
import { ConversationModule } from './conversation';
import { StatusModule } from '../../status';
import { SpinnerModule } from '../../spinner';
import { DocumentsModule } from './documents';
import { RevokeClaimDialogComponent } from './revoke-claim-dialog';
import { ConfirmActionDialogModule } from '../../confirm-action-dialog';

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
        ReactiveFormsModule,
        MatDialogModule,
        MatInputModule,
        ConfirmActionDialogModule
    ],
    declarations: [ClaimComponent, RevokeClaimDialogComponent],
    entryComponents: [RevokeClaimDialogComponent]
})
export class ClaimModule {}
