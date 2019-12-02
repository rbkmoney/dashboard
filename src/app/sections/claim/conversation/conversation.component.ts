import { Component } from '@angular/core';

import { ConversationService } from './conversation.service';

@Component({
    templateUrl: 'conversation.component.html',
    styleUrls: ['conversation.component.scss'],
    providers: [ConversationService]
})
export class ConversationComponent {
    timelineInfo$ = this.conversationService.timelineInfo$;

    constructor(private conversationService: ConversationService) {}
}
