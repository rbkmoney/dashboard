import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
    ConversationID,
    ConversationResponse,
    ConversationsService,
    ConversationStatus,
    SaveConversationParams
} from '../../api-codegen/messages';

@Injectable()
export class MessagesService {
    constructor(private conversationsService: ConversationsService) {}

    getConversations(
        conversationId: ConversationID[],
        conversationStatus?: ConversationStatus
    ): Observable<ConversationResponse> {
        return this.conversationsService.getConversations(conversationId, conversationStatus);
    }

    saveConversations(params: SaveConversationParams): Observable<any> {
        return this.conversationsService.saveConversations(params);
    }
}
