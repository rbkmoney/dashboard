import { Component } from '@angular/core';

import { SendCommentService } from './send-comment.service';

@Component({
    selector: 'dsh-send-comment',
    templateUrl: 'send-comment.component.html',
    styleUrls: ['send-comment.component.scss'],
    providers: [SendCommentService]
})
export class SendCommentBlockComponent {}
