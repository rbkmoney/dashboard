import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
    Conversation,
    ConversationParam,
    ConversationResponse,
    ConversationsService,
    ConversationStatus,
} from '@dsh/api-codegen/messages';

@Injectable()
export class MessagesService {
    constructor(private conversationsService: ConversationsService) {}

    getConversations(
        conversationId: Conversation['conversationId'][],
        conversationStatus?: ConversationStatus
    ): Observable<ConversationResponse> {
        return this.conversationsService.getConversations(conversationId, conversationStatus);
    }

    saveConversations(params: ConversationParam[]): Observable<any> {
        return this.conversationsService.saveConversations(params);
    }
}
