import {
    ClaimModificationType,
    CommentModificationUnit,
    DocumentModificationUnit,
    FileModificationUnit,
    StatusModificationUnit,
} from '@dsh/api-codegen/claim-management';

import { createUnionTypeGuardCreator } from '../../utils';

const Type = ClaimModificationType.ClaimModificationTypeEnum;
const createTypeGuard = createUnionTypeGuardCreator<ClaimModificationType>('claimModificationType');

export const isFileModificationUnit = createTypeGuard<FileModificationUnit>(Type.FileModificationUnit);
export const isCommentModificationUnit = createTypeGuard<CommentModificationUnit>(Type.CommentModificationUnit);
export const isStatusModificationUnit = createTypeGuard<StatusModificationUnit>(Type.StatusModificationUnit);
export const isDocumentModificationUnit = createTypeGuard<DocumentModificationUnit>(Type.DocumentModificationUnit);
