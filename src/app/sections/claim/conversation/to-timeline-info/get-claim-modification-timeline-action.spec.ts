import { SpecificModificationUnit } from '../../../../api/claims/utils';
import { ClaimModification, StatusModificationUnit } from '../../../../api-codegen/claim-management';
import { getClaimModificationTimelineAction } from './get-claim-modification-timeline-action';
import { TimelineAction } from './timeline-action';

describe('getClaimModificationTimelineAction', () => {
    const partialClaimModification = {
        modificationID: 1,
        createdAt: '2019-08-08T10:20:30Z' as any,
        modification: {
            modificationType: 'ClaimModification'
        }
    };

    it('empty modification should return error', () => {
        expect(() => getClaimModificationTimelineAction({} as any)).toThrow(
            new Error('Modification unit is incomplete')
        );
    });

    it('wrong ClaimModification should return error', () => {
        const unit = {
            ...partialClaimModification,
            modification: {
                ...partialClaimModification.modification,
                claimModificationType: {
                    claimModificationType: 'UnidentifiedModificationUnit'
                }
            }
        } as SpecificModificationUnit<any>;
        expect(() => getClaimModificationTimelineAction(unit)).toThrow(new Error('Claim modification unidentified'));
    });

    it('should be claimCreated action', () => {
        const unit = {
            ...partialClaimModification,
            modification: {
                ...partialClaimModification.modification,
                claimModificationType: {
                    claimModificationType: 'DocumentModificationUnit',
                    documentId: '1',
                    documentModification: {
                        documentModificationType: 'DocumentCreated'
                    }
                }
            }
        } as SpecificModificationUnit<ClaimModification>;
        expect(getClaimModificationTimelineAction(unit)).toBe(TimelineAction.claimCreated);
    });

    it('should be commentAdded action', () => {
        const unit = {
            ...partialClaimModification,
            modification: {
                ...partialClaimModification.modification,
                claimModificationType: {
                    claimModificationType: 'CommentModificationUnit',
                    commentId: '1',
                    commentModification: {
                        commentModificationType: 'CommentCreated'
                    }
                }
            }
        } as SpecificModificationUnit<ClaimModification>;
        expect(getClaimModificationTimelineAction(unit)).toBe(TimelineAction.commentAdded);
    });

    it('should be documentsAdded action', () => {
        const unit = {
            ...partialClaimModification,
            modification: {
                ...partialClaimModification.modification,
                claimModificationType: {
                    claimModificationType: 'FileModificationUnit',
                    commentId: '1',
                    fileModification: {
                        fileModificationType: 'FileCreated'
                    }
                }
            }
        } as SpecificModificationUnit<ClaimModification>;
        expect(getClaimModificationTimelineAction(unit)).toBe(TimelineAction.documentsAdded);
    });

    describe('should be status action', () => {
        const applyStatus = (target: any, status: StatusModificationUnit.StatusEnum) =>
            ({
                ...target,
                modification: {
                    ...target.modification,
                    claimModificationType: {
                        claimModificationType: 'StatusModificationUnit',
                        status,
                        statusModification: {
                            statusModificationType: 'StatusChanged'
                        }
                    }
                }
            } as SpecificModificationUnit<ClaimModification>);

        it('accepted', () => {
            const modificationUnit = applyStatus(partialClaimModification, 'accepted');
            expect(getClaimModificationTimelineAction(modificationUnit)).toBe(TimelineAction.statusAccepted);
        });

        it('denied', () => {
            const modificationUnit = applyStatus(partialClaimModification, 'denied');
            expect(getClaimModificationTimelineAction(modificationUnit)).toBe(TimelineAction.statusDenied);
        });

        it('pending', () => {
            const modificationUnit = applyStatus(partialClaimModification, 'pending');
            expect(getClaimModificationTimelineAction(modificationUnit)).toBe(TimelineAction.statusPending);
        });

        it('pendingAcceptance', () => {
            const modificationUnit = applyStatus(partialClaimModification, 'pendingAcceptance');
            expect(getClaimModificationTimelineAction(modificationUnit)).toBe(TimelineAction.statusPendingAcceptance);
        });

        it('review', () => {
            const modificationUnit = applyStatus(partialClaimModification, 'review');
            expect(getClaimModificationTimelineAction(modificationUnit)).toBe(TimelineAction.statusReview);
        });

        it('revoked', () => {
            const modificationUnit = applyStatus(partialClaimModification, 'revoked');
            expect(getClaimModificationTimelineAction(modificationUnit)).toBe(TimelineAction.statusRevoked);
        });
    });
});
