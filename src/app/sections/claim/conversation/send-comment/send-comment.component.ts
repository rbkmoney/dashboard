import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { ConversationID } from '../../../../api-codegen/messages';
import { SendCommentService } from './send-comment.service';
import { UploadFilesService } from './upload-files.service';

@Component({
    selector: 'dsh-send-comment',
    templateUrl: 'send-comment.component.html',
    styleUrls: ['send-comment.component.scss'],
    providers: [SendCommentService, UploadFilesService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SendCommentComponent {
    @Output() conversationSaved: EventEmitter<ConversationID> = new EventEmitter();

    form: FormGroup = this.sendCommentService.form;
    errorCode$ = this.sendCommentService.errorCode$;
    inProgress$ = combineLatest([this.sendCommentService.inProgress$, this.fileUploaderService.isUploading$]).pipe(
        map((v) => v.includes(true)),
        shareReplay(1)
    );

    constructor(private sendCommentService: SendCommentService, private fileUploaderService: UploadFilesService) {
        this.sendCommentService.conversationSaved$.subscribe((id) => this.conversationSaved.next(id));
    }

    sendComment(comment: string) {
        this.sendCommentService.sendComment(comment);
    }

    startUploading(file: File) {
        this.fileUploaderService.uploadFiles([file]);
    }
}
