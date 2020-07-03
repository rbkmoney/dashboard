import { FileModification } from '../../../api-codegen/claim-management';
import { ConversationID } from '../../../api-codegen/messages';

export interface UpdateParams {
    type: 'updateConversation' | 'updateFiles';
}

export interface UpdateConversationParams extends UpdateParams {
    conversationId: ConversationID;
}

export interface UpdateFilesParams extends UpdateParams {
    fileIds: string[];
    fileModificationType: FileModification.FileModificationTypeEnum;
}
