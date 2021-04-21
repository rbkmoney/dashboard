import {
    ClaimModificationType,
    CommentModificationUnit,
    DocumentModificationUnit,
    FileModificationUnit,
    StatusModificationUnit,
} from '@dsh/api-codegen/claim-management';

import { createUnionTypeGuardCreator } from '../../utils';

const TYPE = ClaimModificationType.ClaimModificationTypeEnum;
const createTypeGuard = createUnionTypeGuardCreator<ClaimModificationType>('claimModificationType');

export const isFileModificationUnit = createTypeGuard<FileModificationUnit>(TYPE.FileModificationUnit);
export const isCommentModificationUnit = createTypeGuard<CommentModificationUnit>(TYPE.CommentModificationUnit);
export const isStatusModificationUnit = createTypeGuard<StatusModificationUnit>(TYPE.StatusModificationUnit);
export const isDocumentModificationUnit = createTypeGuard<DocumentModificationUnit>(TYPE.DocumentModificationUnit);
