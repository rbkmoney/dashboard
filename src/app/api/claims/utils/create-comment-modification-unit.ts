import { CommentModificationUnit } from '@dsh/api-codegen/claim-management';

import { SpecificClaimModificationUnit } from './specific-claim-modification-unit';

export const createCommentModificationUnit = (
    commentId: string
): SpecificClaimModificationUnit<CommentModificationUnit> => ({
    modificationType: 'ClaimModification',
    claimModificationType: {
        claimModificationType: 'CommentModificationUnit',
        commentId,
        commentModification: {
            commentModificationType: 'CommentCreated',
        },
    },
});
