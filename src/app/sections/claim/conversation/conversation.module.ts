import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { TranslocoModule } from '@ngneat/transloco';
import { ReactiveFormsModule } from '@angular/forms';

import { ConversationComponent } from './conversation.component';
import { LayoutModule } from '../../../layout';
import { ButtonModule } from '../../../button';
import { ExpandPanelModule } from '../../../expand-panel';
import { HumanizeDurationModule } from '../../../humanize-duration';
import { ConversationRoutingModule } from './conversation-routing.module';
import { ActionColorPipe } from './action-color.pipe';
import { ActionIconPipe } from './action-icon.pipe';
import {
    CommentContainerModule,
    FileContainerModule,
    DocumentContainerModule
} from '../../claim-modification-containers';
import { SendCommentComponent } from './send-comment';
import { MessagesModule, FilesModule } from '../../../api';
import { ConfirmActionDialogModule } from '../../../confirm-action-dialog';

@NgModule({
    imports: [
        ConversationRoutingModule,
        LayoutModule,
        ButtonModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        ExpandPanelModule,
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
