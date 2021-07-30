import {
    ClaimModificationType,
    CommentModificationUnit,
    DocumentModificationUnit,
    ExternalInfoModificationUnit,
    FileModificationUnit,
    StatusModificationUnit,
} from '@dsh/api-codegen/claim-management';

import { createUnionTypeGuardCreator } from '../../utils';

import ClaimModificationTypeEnum = ClaimModificationType.ClaimModificationTypeEnum;

const createTypeGuard = createUnionTypeGuardCreator<ClaimModificationType>('claimModificationType');

export const isFileModificationUnit = createTypeGuard<FileModificationUnit>(
    ClaimModificationTypeEnum.FileModificationUnit
);
export const isCommentModificationUnit = createTypeGuard<CommentModificationUnit>(
    ClaimModificationTypeEnum.CommentModificationUnit
);
export const isStatusModificationUnit = createTypeGuard<StatusModificationUnit>(
    ClaimModificationTypeEnum.StatusModificationUnit
);
export const isDocumentModificationUnit = createTypeGuard<DocumentModificationUnit>(
    ClaimModificationTypeEnum.DocumentModificationUnit
);
export const isExternalInfoModificationUnit = createTypeGuard<ExternalInfoModificationUnit>(
    ClaimModificationTypeEnum.ExternalInfoModificationUnit
);
