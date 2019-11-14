import { Injectable } from '@angular/core';

import {
    ConversationsService,
    ConversationID,
    SaveConversationParams,
    ConversationStatus
} from '../../api-codegen/messages';

@Injectable()
export class MessagesService {
    constructor(private conversationsService: ConversationsService) {}

    getConversations(conversationId: ConversationID[], conversationStatus?: ConversationStatus) {
        return this.conversationsService.getConversations(conversationId, conversationStatus);
    }

    saveConversations(params: SaveConversationParams) {
        return this.conversationsService.saveConversations(params);
    }
}
