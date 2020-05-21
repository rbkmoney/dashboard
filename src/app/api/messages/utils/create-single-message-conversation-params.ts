import uuid from 'uuid';

import { SaveConversationParams } from '../../../api-codegen/messages';

export const createSingleMessageConversationParams = (conversationId: string, text: string): SaveConversationParams => [
    { conversationId, messages: [{ messageId: uuid(), text }] },
];
