import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatInputModule, MatIconModule } from '@angular/material';
import { CommonModule } from '@angular/common';

import { ClaimComponent } from './claim';
import { LayoutModule } from '../../layout';
import { DshTabsModule } from '../../layout/tabs';
import { ButtonModule } from '../../button';
import { TimelineModule } from '../../timeline';
import { ExpandPanelModule } from '../../expand-panel';
import { ConversationComponent } from './claim';
import { ClaimsRoutingModule } from './claims-routing.module';
import { LocaleModule } from '../../locale';
import { HumanizeDurationModule } from '../../humanize-duration';

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
        ClaimsRoutingModule,
        LocaleModule,
        CommonModule,
        HumanizeDurationModule
    ],
    declarations: [ClaimComponent, ConversationComponent]
})
export class ClaimsModule {}
