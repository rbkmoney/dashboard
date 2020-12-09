import {
    ClaimModification,
    Modification,
    ModificationUnit,
    StatusModificationUnit,
    UserInfo,
} from '@dsh/api-codegen/claim-management/swagger-codegen';

import { TimelineItemInfo } from './model';
import { toTimelineInfo } from './to-timeline-info';

const genUserInfo = (userType: UserInfo.UserTypeEnum): UserInfo => ({
    userId: '',
    email: '',
    username: '',
    userType,
});

const genPartialModification = (
    modificationID: number,
    createdAt: string,
    modificationType: Modification.ModificationTypeEnum,
    userType: UserInfo.UserTypeEnum = 'external_user'
) => ({
    modificationID,
    createdAt: createdAt as any,
    userInfo: genUserInfo(userType),
    modification: {
        modificationType,
    },
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
                statusModification: { statusModificationType: 'StatusChanged' },
            },
        } as ClaimModification,
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
                commentModification: { commentModificationType: 'CommentCreated' },
            },
        } as ClaimModification,
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
                fileModification: { fileModificationType: 'FileCreated' },
            },
        } as ClaimModification,
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
                documentModification: { documentModificationType: 'DocumentCreated' },
            },
        } as ClaimModification,
    };
};

describe('toTimelineInfo', () => {
    it('DocumentModificationUnit should return changesAdded action', () => {
        const createdAt = '2019-11-21T18:30:00.000000Z';
        const units = [genDocumentModificationUnit(66, createdAt, '7dfbc2fe-7ac4-416a-9f96-documentId1')];
        const result = toTimelineInfo(units);
        const expected = [
            {
                action: 'changesAdded',
                userInfo: units[0].userInfo,
                createdAt,
                modifications: [units[0].modification],
            } as TimelineItemInfo,
        ];
        expect(result).toEqual(expected);
    });

    it('FileModificationUnit should return filesAdded action', () => {
        const createdAt = '2019-11-21T18:40:00.000000Z';
        const units = [genFileModificationUnit(67, createdAt, '7dfbc2fe-7ac4-416a-9f96-fileId1')];
        const result = toTimelineInfo(units);
        const expected = [
            {
                action: 'filesAdded',
                userInfo: units[0].userInfo,
                createdAt,
                modifications: [units[0].modification],
            } as TimelineItemInfo,
        ];
        expect(result).toEqual(expected);
    });

    it('StatusModificationUnit with status review should return statusReview action', () => {
        const createdAt = '2019-11-21T18:43:00.000000Z';
        const units = [genStatusModificationUnit(69, createdAt, 'review')];
        const result = toTimelineInfo(units);
        const expected = [
            {
                action: 'statusReview',
                userInfo: units[0].userInfo,
                createdAt,
                modifications: [],
            } as TimelineItemInfo,
        ];
        expect(result).toEqual(expected);
    });

    it('StatusModificationUnit with status accepted should return statusAccepted action', () => {
        const createdAt = '2019-11-21T18:43:00.000000Z';
        const units = [genStatusModificationUnit(69, createdAt, 'accepted')];
        const result = toTimelineInfo(units);
        const expected = [
            {
                action: 'statusAccepted',
                userInfo: units[0].userInfo,
                createdAt,
                modifications: [],
            } as TimelineItemInfo,
        ];
        expect(result).toEqual(expected);
    });

    it('StatusModificationUnit with status denied should return statusDenied action', () => {
        const createdAt = '2019-11-21T18:43:00.000000Z';
        const units = [genStatusModificationUnit(69, createdAt, 'denied')];
        const result = toTimelineInfo(units);
        const expected = [
            {
                action: 'statusDenied',
                userInfo: units[0].userInfo,
                createdAt,
                modifications: [],
            } as TimelineItemInfo,
        ];
        expect(result).toEqual(expected);
    });

    it('StatusModificationUnit with status revoked should return statusRevoked action', () => {
        const createdAt = '2019-11-21T18:43:00.000000Z';
        const units = [genStatusModificationUnit(69, createdAt, 'revoked')];
        const result = toTimelineInfo(units);
        const expected = [
            {
                action: 'statusRevoked',
                userInfo: units[0].userInfo,
                createdAt,
                modifications: [],
            } as TimelineItemInfo,
        ];
        expect(result).toEqual(expected);
    });

    it('StatusModificationUnit with status pending should return statusPending action', () => {
        const createdAt = '2019-11-21T18:43:00.000000Z';
        const units = [genStatusModificationUnit(69, createdAt, 'pending')];
        const result = toTimelineInfo(units);
        const expected = [
            {
                action: 'statusPending',
                userInfo: units[0].userInfo,
                createdAt,
                modifications: [],
            } as TimelineItemInfo,
        ];
        expect(result).toEqual(expected);
    });

    it('StatusModificationUnit with status pendingAcceptance should ignore', () => {
        const createdAt = '2019-11-21T18:43:00.000000Z';
        const units = [genStatusModificationUnit(69, createdAt, 'pendingAcceptance')];
        const result = toTimelineInfo(units);
        const expected = [];
        expect(result).toEqual(expected);
    });

    it('CommentModificationUnit should return commentAdded action', () => {
        const createdAt = '2019-11-21T18:43:00.000000Z';
        const units = [genCommentModificationUnit(70, createdAt, '7dfbc2fe-7ac4-416a-9f96-commentId1')];
        const result = toTimelineInfo(units);
        const expected = [
            {
                action: 'commentAdded',
                userInfo: units[0].userInfo,
                createdAt,
                modifications: [units[0].modification],
            } as TimelineItemInfo,
        ];
        expect(result).toEqual(expected);
    });

    it('2 neighboring and same units should concat modifications', () => {
        const createdAt = '2019-11-21T18:43:00.000000Z';
        const units = [
            genFileModificationUnit(67, '2019-11-21T18:40:00.000000Z', '7dfbc2fe-7ac4-416a-9f96-fileId1'),
            genFileModificationUnit(68, createdAt, '7dfbc2fe-7ac4-416a-9f96-fileId2'),
        ];
        const result = toTimelineInfo(units);
        const expected = [
            {
                action: 'filesAdded',
                userInfo: units[0].userInfo,
                createdAt,
                modifications: [units[0].modification, units[1].modification],
            } as TimelineItemInfo,
        ];
        expect(result).toEqual(expected);
    });
});
