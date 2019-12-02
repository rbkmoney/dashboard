import { toTimelineInfo } from './to-timeline-info';
import {
    ClaimChangeset,
    ClaimModification,
    ModificationUnit,
    StatusModificationUnit,
    Modification
} from '../../../../api-codegen/claim-management/swagger-codegen';

const genPartialModification = (
    modificationID: number,
    createdAt: string,
    modificationType: Modification.ModificationTypeEnum
) => ({
    modificationID,
    createdAt: createdAt as any,
    modification: {
        modificationType
    }
});

const genStatusModificationUnit = (
    modificationID: number,
    createdAt: string,
    status: StatusModificationUnit.StatusEnum
): ModificationUnit => {
    const m = genPartialModification(modificationID, createdAt, 'ClaimModification');
    return {
        ...m,
        modification: {
            ...m.modification,
            claimModificationType: {
                claimModificationType: 'StatusModificationUnit',
                status,
                statusModification: { statusModificationType: 'StatusChanged' }
            }
        } as ClaimModification
    };
};

const genCommentModificationUnit = (modificationID: number, createdAt: string, commentId: string): ModificationUnit => {
    const m = genPartialModification(modificationID, createdAt, 'ClaimModification');
    return {
        ...m,
        modification: {
            ...m.modification,
            claimModificationType: {
                claimModificationType: 'CommentModificationUnit',
                commentId,
                commentModification: { commentModificationType: 'CommentCreated' }
            }
        } as ClaimModification
    };
};

const genFileModificationUnit = (modificationID: number, createdAt: string, fileId: string): ModificationUnit => {
    const m = genPartialModification(modificationID, createdAt, 'ClaimModification');
    return {
        ...m,
        modification: {
            ...m.modification,
            claimModificationType: {
                claimModificationType: 'FileModificationUnit',
                fileId,
                fileModification: { fileModificationType: 'FileCreated' }
            }
        } as ClaimModification
    };
};

const genDocumentModificationUnit = (
    modificationID: number,
    createdAt: string,
    documentId: string
): ModificationUnit => {
    const m = genPartialModification(modificationID, createdAt, 'ClaimModification');
    return {
        ...m,
        modification: {
            ...m.modification,
            claimModificationType: {
                claimModificationType: 'DocumentModificationUnit',
                documentId,
                documentModification: { documentModificationType: 'DocumentCreated' }
            }
        } as ClaimModification
    };
};

const changeset = [
    genDocumentModificationUnit(66, '2019-11-21T18:30:00.000000Z', '7dfbc2fe-7ac4-416a-9f96-documentId1'),
    genFileModificationUnit(67, '2019-11-21T18:40:00.000000Z', '7dfbc2fe-7ac4-416a-9f96-fileId1'),
    genFileModificationUnit(68, '2019-11-21T18:41:00.000000Z', '7dfbc2fe-7ac4-416a-9f96-fileId2'),
    genStatusModificationUnit(69, '2019-11-21T18:43:00.000000Z', 'review'),
    genCommentModificationUnit(70, '2019-11-22T10:00:00.000000Z', '7dfbc2fe-7ac4-416a-9f96-commentId1'),
    genStatusModificationUnit(71, '2019-11-22T10:01:00.000000Z', 'pendingAcceptance'),
    genStatusModificationUnit(72, '2019-11-22T10:02:00.000000Z', 'pending'),
    genStatusModificationUnit(73, '2019-11-22T10:03:00.000000Z', 'accepted'),
    genStatusModificationUnit(74, '2019-11-22T10:04:00.000000Z', 'denied'),
    genStatusModificationUnit(75, '2019-11-22T10:05:00.000000Z', 'revoked'),
    genCommentModificationUnit(76, '2019-11-22T10:10:00.000000Z', '7dfbc2fe-7ac4-416a-9f96-commentId2')
] as ClaimChangeset;

describe('toTimelineInfo', () => {
    it('should work', () => {
        const result = toTimelineInfo(changeset);
        console.log(result);
        expect(result).toBeDefined();
    });
});
