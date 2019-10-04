import { SpecificModificationUnit } from '../../../../api/claims/utils';
import {
    ClaimModification,
    DocumentModificationUnit,
    CommentModificationUnit,
    FileModificationUnit,
    StatusModificationUnit
} from '../../../../api-codegen/claim-management';
import { getClaimModificationTimelineAction } from './get-claim-modification-timeline-action';
import { TimelineAction } from './timeline-action';

describe('getClaimModificationTimelineAction', () => {
    function createClaimModificationUnit(
        claimModificationType?: ClaimModification.ClaimModificationTypeEnum
    ): SpecificModificationUnit<ClaimModification> {
        return {
            modificationID: 1,
            createdAt: '2019-08-08T10:20:30Z' as any,
            modification: {
                modificationType: 'ClaimModification',
                claimModificationType
            }
        };
    }

    it('empty modification should return error', () => {
        expect(() => getClaimModificationTimelineAction({} as any)).toThrow(
            new Error('Modification unit is incomplete')
        );
    });

    it('not specific ClaimModification should return error', () => {
        const modificationUnit = createClaimModificationUnit();
        expect(() => getClaimModificationTimelineAction(modificationUnit)).toThrow(
            new Error('Modification unit is incomplete')
        );
    });

    it('wrong ClaimModification should return error', () => {
        const modificationUnit = createClaimModificationUnit(
            'TestWrongModification123' as ClaimModification.ClaimModificationTypeEnum
        );
        expect(() => getClaimModificationTimelineAction(modificationUnit)).toThrow(
            new Error('Claim modification unidentified')
        );
    });

    it('should be claimCreated action', () => {
        const modificationUnit = createClaimModificationUnit('DocumentModificationUnit');
        const documentModificationUnit: SpecificModificationUnit<DocumentModificationUnit> = {
            ...modificationUnit,
            modification: {
                ...modificationUnit.modification,
                id: '1',
                modification: { documentModificationType: 'DocumentCreated' }
            }
        };
        expect(getClaimModificationTimelineAction(documentModificationUnit)).toBe(TimelineAction.claimCreated);
    });

    it('should be commentAdded action', () => {
        const modificationUnit = createClaimModificationUnit('CommentModificationUnit');
        const commentModificationUnit: SpecificModificationUnit<CommentModificationUnit> = {
            ...modificationUnit,
            modification: {
                ...modificationUnit.modification,
                id: '1',
                modification: { commentModificationType: 'CommentCreated' }
            }
        };
        expect(getClaimModificationTimelineAction(commentModificationUnit)).toBe(TimelineAction.commentAdded);
    });

    it('should be documentsAdded action', () => {
        const modificationUnit = createClaimModificationUnit('FileModificationUnit');
        const fileModificationUnit: SpecificModificationUnit<FileModificationUnit> = {
            ...modificationUnit,
            modification: {
                ...modificationUnit.modification,
                id: '1',
                modification: {
                    fileModificationType: 'FileCreated'
                }
            }
        };
        expect(getClaimModificationTimelineAction(fileModificationUnit)).toBe(TimelineAction.documentsAdded);
    });

    describe('should be status action', () => {
        function createStatusModificationUnit(
            status?: StatusModificationUnit.StatusEnum
        ): SpecificModificationUnit<StatusModificationUnit> {
            const modificationUnit = createClaimModificationUnit('StatusModificationUnit');
            return {
                ...modificationUnit,
                modification: {
                    ...modificationUnit.modification,
                    id: '1',
                    status,
                    modification: {
                        statusModificationType: 'StatusChanged'
                    }
                }
            };
        }

        it('accepted', () => {
            const modificationUnit = createStatusModificationUnit('accepted');
            expect(getClaimModificationTimelineAction(modificationUnit)).toBe(TimelineAction.statusAccepted);
        });

        it('denied', () => {
            const modificationUnit = createStatusModificationUnit('denied');
            expect(getClaimModificationTimelineAction(modificationUnit)).toBe(TimelineAction.statusDenied);
        });

        it('pending', () => {
            const modificationUnit = createStatusModificationUnit('pending');
            expect(getClaimModificationTimelineAction(modificationUnit)).toBe(TimelineAction.statusPending);
        });

        it('pendingAcceptance', () => {
            const modificationUnit = createStatusModificationUnit('pendingAcceptance');
            expect(getClaimModificationTimelineAction(modificationUnit)).toBe(TimelineAction.statusPendingAcceptance);
        });

        it('review', () => {
            const modificationUnit = createStatusModificationUnit('review');
            expect(getClaimModificationTimelineAction(modificationUnit)).toBe(TimelineAction.statusReview);
        });

        it('revoked', () => {
            const modificationUnit = createStatusModificationUnit('revoked');
            expect(getClaimModificationTimelineAction(modificationUnit)).toBe(TimelineAction.statusRevoked);
        });
    });
});
