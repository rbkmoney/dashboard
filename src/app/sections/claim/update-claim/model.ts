import { FileModification } from '@dsh/api-codegen/claim-management';
import { Conversation } from '@dsh/api-codegen/messages';

export interface UpdateParams {
    type: 'updateConversation' | 'updateFiles';
}

export interface UpdateConversationParams extends UpdateParams {
    conversationId: Conversation['conversationId'];
}

export interface UpdateFilesParams extends UpdateParams {
    fileIds: string[];
    fileModificationType: FileModification.FileModificationTypeEnum;
}
