import {
    ClaimModification,
    FileModificationUnit,
    Modification,
    ModificationUnit,
} from '@dsh/api-codegen/claim-management';
import { isClaimModification, sortUnitsByCreatedAtAsc } from '@dsh/api/claims';

import { getClaimModificationTimelineAction } from './get-claim-modification-timeline-action';
import { TimelineAction, TimelineItemInfo } from './model';

const getUnitTimelineAction = (modification: Modification): TimelineAction | null => {
    if (isClaimModification(modification)) {
        return getClaimModificationTimelineAction(modification.claimModificationType);
    }
    return null;
};

const deleteAddedFile = (acc: TimelineItemInfo[], deletedFileId: string): TimelineItemInfo[] => {
    const result = acc.slice();
    for (let i = 0, item = result[0]; i < result.length; i += 1, item = result[i]) {
        if (item.action !== TimelineAction.filesAdded) {
            continue;
        }
        const fileModificationIdx = (item.modifications as ClaimModification[]).findIndex(
            ({ claimModificationType }) => (claimModificationType as FileModificationUnit).fileId === deletedFileId
        );
        if (fileModificationIdx === -1) {
            continue;
        }
        if (item.modifications.length === 1) {
            result.splice(i, 1);
        } else {
            item.modifications.splice(fileModificationIdx, 1);
        }
        return result;
    }
    console.error(`Deleted file "${deletedFileId}" not found`);
    return result;
};

const getFileId = (modification: Modification): string =>
    ((modification as ClaimModification).claimModificationType as FileModificationUnit).fileId;

const reduceToAcceptedTimelineItem = (
    acc: TimelineItemInfo[],
    { createdAt, modification, userInfo }: ModificationUnit
): TimelineItemInfo[] => {
    const action = getUnitTimelineAction(modification);
    if (!action) {
        return acc;
    }
    const modifications = [];
    switch (action) {
        case TimelineAction.filesDeleted:
            return deleteAddedFile(acc, getFileId(modification));
        case TimelineAction.changesAdded:
        case TimelineAction.filesAdded:
        case TimelineAction.commentAdded:
            modifications.push(modification);
    }
    const timelineInfo = {
        action,
        userInfo,
        createdAt: createdAt as any,
        modifications,
    };
    return [...acc, timelineInfo];
};

export const toTimelineInfo = (units: ModificationUnit[]): TimelineItemInfo[] =>
    Array.isArray(units) && units.length
        ? units.slice().sort(sortUnitsByCreatedAtAsc).reduce(reduceToAcceptedTimelineItem, [])
        : [];
