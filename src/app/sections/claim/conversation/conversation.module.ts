import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule, MatInputModule, MatIconModule } from '@angular/material';

import { TimelineModule } from '../../../timeline';
import { ConversationComponent } from './conversation.component';
import { TimelineActionIconComponent } from './timeline-action-icon';
import { LayoutModule } from '../../../layout';
import { ButtonModule } from '../../../button';
import { TimelineActionDicPathPipe } from './timeline-action-dic-path.pipe';
import { ExpandPanelModule } from '../../../expand-panel';
import { LocaleModule } from '../../../locale';
import { HumanizeDurationModule } from '../../../humanize-duration';
import { TimelineItemAuthorDicPathPipe } from './timeline-item-author-dic-path.pipe';

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
        TimelineActionDicPathPipe,
        TimelineActionIconComponent,
        TimelineItemAuthorDicPathPipe
    ],
    exports: [ConversationComponent]
})
export class ConversationModule {}
