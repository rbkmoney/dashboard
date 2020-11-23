import uuid from 'uuid';

import { ConversationParam } from '../../../api-codegen/messages';

export const createSingleMessageConversationParams = (conversationId: string, text: string): ConversationParam[] => [
    { conversationId, messages: [{ messageId: uuid(), text }] },
];
