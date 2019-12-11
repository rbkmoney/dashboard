import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule, MatInputModule, MatIconModule } from '@angular/material';
import { TranslocoModule } from '@ngneat/transloco';
import { ReactiveFormsModule } from '@angular/forms';

import { TimelineModule } from '../../../timeline';
import { ConversationComponent } from './conversation.component';
import { LayoutModule } from '../../../layout';
import { ButtonModule } from '../../../button';
import { ExpandPanelModule } from '../../../expand-panel';
import { HumanizeDurationModule } from '../../../humanize-duration';
import { ConversationRoutingModule } from './conversation-routing.module';
import { ActionColorPipe } from './action-color.pipe';
import { ActionIconPipe } from './action-icon.pipe';
import { ChangeContainerModule, CommentContainerModule } from '../../claim-modification-containers';
import { SendCommentComponent } from './send-comment';
import { MessagesModule } from '../../../api';

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
        TranslocoModule,
        ChangeContainerModule,
        CommentContainerModule,
        ReactiveFormsModule,
        MessagesModule
    ],
    declarations: [ConversationComponent, ActionColorPipe, ActionIconPipe, SendCommentComponent]
})
export class ConversationModule {}
