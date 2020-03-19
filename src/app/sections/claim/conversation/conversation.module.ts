import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule } from '@angular/material';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { LayoutModule } from '@dsh/components/layout';

import { FilesModule, MessagesModule } from '../../../api';
import { ConfirmActionDialogModule } from '../../../confirm-action-dialog';
import { HumanizeDurationModule } from '../../../humanize-duration';
import {
    CommentContainerModule,
    DocumentContainerModule,
    FileContainerModule
} from '../../claim-modification-containers';
import { ActionColorPipe } from './action-color.pipe';
import { ActionIconPipe } from './action-icon.pipe';
import { ConversationRoutingModule } from './conversation-routing.module';
import { ConversationComponent } from './conversation.component';
import { SendCommentComponent } from './send-comment';

@NgModule({
    imports: [
        ConversationRoutingModule,
        LayoutModule,
        ButtonModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        CommonModule,
        HumanizeDurationModule,
        TranslocoModule,
        CommentContainerModule,
        FileContainerModule,
        ReactiveFormsModule,
        MessagesModule,
        FilesModule,
        DocumentContainerModule,
        MatMenuModule,
        ConfirmActionDialogModule
    ],
    declarations: [ConversationComponent, ActionColorPipe, ActionIconPipe, SendCommentComponent]
})
export class ConversationModule {}
