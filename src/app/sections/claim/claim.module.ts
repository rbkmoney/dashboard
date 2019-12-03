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
import { ClaimsModule } from '../../api/claims';
import { ConversationModule } from './conversation';
import { StatusModule } from '../../status';
import { SpinnerModule } from '../../spinner';
import { ConfirmActionDialogModule } from '../../confirm-action-dialog';
import { DocumentsModule } from './documents';

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
        ConfirmActionDialogModule
    ],
    declarations: [ClaimComponent, ChangesComponent]
})
export class ClaimModule {}
