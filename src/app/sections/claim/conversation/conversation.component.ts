import { Component } from '@angular/core';
import { map } from 'rxjs/operators';

import { ConversationService } from './conversation.service';

@Component({
    selector: 'dsh-conversation',
    templateUrl: 'conversation.component.html',
    styleUrls: ['conversation.component.scss'],
    providers: [ConversationService]
})
export class ConversationComponent {
    updatedAt$ = this.conversationService.claim$.pipe(map(({ updatedAt }) => updatedAt));
    timelineInfo$ = this.conversationService.timelineInfo$;

    constructor(private conversationService: ConversationService) {}
}
