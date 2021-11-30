import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { TranslocoModule } from '@ngneat/transloco';
import { ngfModule } from 'angular-file';

import { FilesModule } from '@dsh/api/files';
import { MessagesModule } from '@dsh/api/messages';
import { ButtonModule } from '@dsh/components/buttons';
import { BootstrapIconModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';
import { ConfirmActionDialogModule } from '@dsh/components/popups';

import { HumanizeDurationModule } from '../../../../humanize-duration';
import {
    CommentContainerModule,
    DocumentContainerModule,
    FileContainerModule,
} from '../../claim-modification-containers';
import { ActionColorPipe } from './action-color.pipe';
import { ActionIconPipe } from './action-icon.pipe';
import { ConversationComponent } from './conversation.component';
import { SendCommentComponent } from './send-comment';

@NgModule({
    imports: [
        LayoutModule,
        ButtonModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        BootstrapIconModule,
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
        ConfirmActionDialogModule,
        ngfModule,
    ],
    declarations: [ConversationComponent, ActionColorPipe, ActionIconPipe, SendCommentComponent],
    exports: [ConversationComponent],
})
export class ConversationModule {}
