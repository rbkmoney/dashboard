import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ConversationID } from '../../../../api-codegen/messages';
import { SendCommentService } from './send-comment.service';

@Component({
    selector: 'dsh-send-comment',
    templateUrl: 'send-comment.component.html',
    styleUrls: ['send-comment.component.scss'],
    providers: [SendCommentService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SendCommentComponent {
    @Output() conversationSaved: EventEmitter<ConversationID> = new EventEmitter();

    form: FormGroup = this.sendCommentService.form;
    errorCode$ = this.sendCommentService.errorCode$;
    inProgress$ = this.sendCommentService.inProgress$;

    constructor(private sendCommentService: SendCommentService) {
        this.sendCommentService.conversationSaved$.subscribe(id => this.conversationSaved.next(id));
    }

    sendComment(comment: string) {
        this.sendCommentService.sendComment(comment);
    }
}
