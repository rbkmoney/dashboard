import { CommentModificationUnit, ClaimModificationType } from '../../../../api-codegen/claim-management';

export const isCommentModificationUnit = (m: ClaimModificationType): m is CommentModificationUnit =>
    m.claimModificationType === ClaimModificationType.ClaimModificationTypeEnum.CommentModificationUnit;
