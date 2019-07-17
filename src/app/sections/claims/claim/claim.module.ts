import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule, MatInputModule, MatIconModule } from '@angular/material';
import { CommonModule } from '@angular/common';

import { LayoutModule } from '../../../layout';
import { ClaimService } from './claim.service';
import { ClaimComponent } from './claim.component';
import { ConversationComponent } from './conversation';
import { ChangesComponent } from './changes';
import { DocumentsComponent } from './documents';
import { ClaimRoutingModule } from './claim-routing.module';
import { DshTabsModule } from '../../../layout/tabs';
import { ButtonModule } from '../../../button';
import { TimelineModule } from '../../../timeline';
import { ExpandPanelModule } from '../../../expand-panel';
import { LocaleModule } from '../../../locale';
import { HumanizeDurationModule } from '../../../humanize-duration';
import { ClaimsModule as ClaimsManagerModule } from '../../../claims';

@NgModule({
    imports: [
        LayoutModule,
        DshTabsModule,
        ButtonModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        TimelineModule,
        MatIconModule,
        ExpandPanelModule,
        LocaleModule,
        CommonModule,
        HumanizeDurationModule,
        ClaimsManagerModule,
        ClaimRoutingModule
    ],
    declarations: [ClaimComponent, ConversationComponent, ChangesComponent, DocumentsComponent],
    providers: [ClaimService]
})
export class ClaimModule {}
