import { SpecificClaimModificationUnit } from './specific-claim-modification-unit';
import { CommentModificationUnit } from '../../../api-codegen/claim-management';

export const createCommentModificationUnit = (
    commentId: string
): SpecificClaimModificationUnit<CommentModificationUnit> => ({
    modificationType: 'ClaimModification',
    claimModificationType: {
        claimModificationType: 'CommentModificationUnit',
        commentId,
        commentModification: {
            commentModificationType: 'CommentCreated'
        }
    }
});
