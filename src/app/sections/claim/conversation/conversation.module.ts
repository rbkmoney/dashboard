import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule, MatInputModule, MatIconModule } from '@angular/material';

import { TimelineModule } from '../../../timeline';
import { ConversationComponent } from './conversation.component';
import { TimelineActionIconComponent } from './timeline-action-icon';
import { LayoutModule } from '../../../layout';
import { ButtonModule } from '../../../button';
import { TimelineActionTitlePipe } from './timeline-action-title.pipe';
import { ExpandPanelModule } from '../../../expand-panel';
import { LocaleModule } from '../../../locale';
import { HumanizeDurationModule } from '../../../humanize-duration';
import { TimelineItemAuthorNamePipe } from './timeline-item-author-name.pipe';

@NgModule({
    imports: [
        LayoutModule,
        ButtonModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        TimelineModule,
        MatIconModule,
        ExpandPanelModule,
        LocaleModule,
        CommonModule,
        HumanizeDurationModule
    ],
    declarations: [
        ConversationComponent,
        TimelineActionTitlePipe,
        TimelineActionIconComponent,
        TimelineItemAuthorNamePipe
    ],
    exports: [ConversationComponent]
})
export class ConversationModule {}
