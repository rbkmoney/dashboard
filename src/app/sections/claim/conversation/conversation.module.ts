import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule, MatInputModule, MatIconModule } from '@angular/material';
import { TranslocoModule } from '@ngneat/transloco';

import { TimelineModule } from '../../../timeline';
import { ConversationComponent } from './conversation.component';
import { TimelineActionIconComponent } from './timeline-action-icon';
import { LayoutModule } from '../../../layout';
import { ButtonModule } from '../../../button';
import { TimelineActionDicPathPipe } from './timeline-action-dic-path.pipe';
import { ExpandPanelModule } from '../../../expand-panel';
import { HumanizeDurationModule } from '../../../humanize-duration';
import { TimelineItemAuthorDicPathPipe } from './timeline-item-author-dic-path.pipe';
import { ConversationRoutingModule } from './conversation-routing.module';

@NgModule({
    imports: [
        ConversationRoutingModule,
        LayoutModule,
        ButtonModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        TimelineModule,
        MatIconModule,
        ExpandPanelModule,
        CommonModule,
        HumanizeDurationModule,
        TranslocoModule
    ],
    declarations: [
        ConversationComponent,
        TimelineActionDicPathPipe,
        TimelineActionIconComponent,
        TimelineItemAuthorDicPathPipe
    ],
    exports: [TimelineActionDicPathPipe]
})
export class ConversationModule {}
