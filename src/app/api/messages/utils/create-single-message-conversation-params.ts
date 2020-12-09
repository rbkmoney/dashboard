import uuid from 'uuid';

import { ConversationParam } from '@dsh/api-codegen/messages';

export const createSingleMessageConversationParams = (conversationId: string, text: string): ConversationParam[] => [
    { conversationId, messages: [{ messageId: uuid(), text }] },
];
