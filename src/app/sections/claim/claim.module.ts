import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule } from '@ngneat/transloco';

import { ClaimsModule } from '@dsh/api/claims';
import { QuestionaryModule } from '@dsh/api/questionary';
import { BaseDialogModule } from '@dsh/app/shared/components/dialog/base-dialog';
import { ButtonModule } from '@dsh/components/buttons';
import { IndicatorsModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';
import { ConfirmActionDialogModule } from '@dsh/components/popups';
import { BreadcrumbModule } from '@dsh/components/navigation';

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
        MatInputModule,
        ConfirmActionDialogModule,
        BaseDialogModule,
        MatSelectModule,
        BreadcrumbModule,
    ],
    declarations: [ClaimComponent, RevokeClaimDialogComponent],
})
export class ClaimModule {}
