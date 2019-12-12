import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';

import { LayoutModule } from '../../layout';
import { ButtonModule } from '../../button';
import { DshTabsModule } from '../../layout/tabs';
import { ClaimRoutingModule } from './claim-routing.module';
import { ClaimComponent } from './claim.component';
import { ChangesComponent } from './changes';
import { DocumentsComponent } from './documents';
import { ClaimsModule, QuestionaryModule } from '../../api';
import { ConversationModule } from './conversation';
import { StatusModule } from '../../status';
import { SpinnerModule } from '../../spinner';
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
        TranslocoModule,
        SpinnerModule,
        ConfirmActionDialogModule,
        QuestionaryModule
    ],
    declarations: [ClaimComponent, ChangesComponent, DocumentsComponent]
})
export class ClaimModule {}
