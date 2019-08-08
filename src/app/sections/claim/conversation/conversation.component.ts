import { Component } from '@angular/core';

import { ConversationService } from './conversation.service';

@Component({
    selector: 'dsh-conversation',
    templateUrl: 'conversation.component.html',
    styleUrls: ['conversation.component.scss'],
    providers: [ConversationService]
})
export class ConversationComponent {
    get claim$() {
        return this.conversationService.claim$;
    }

    get timelineInfo$() {
        return this.conversationService.timelineInfo$;
    }

    constructor(private conversationService: ConversationService) {}
}
