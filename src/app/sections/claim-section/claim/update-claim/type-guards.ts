import { UpdateConversationParams, UpdateFilesParams, UpdateParams } from './model';

export const isUpdateConversation = (p: UpdateParams): p is UpdateConversationParams => p.type === 'updateConversation';

export const isUpdateFiles = (p: UpdateParams): p is UpdateFilesParams => p.type === 'updateFiles';
