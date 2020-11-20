import { isClaimModification } from '../../../../api';
import {
    ClaimModification,
    FileModificationUnit,
    Modification,
    ModificationUnit,
} from '../../../../api-codegen/claim-management';
import { sortUnitsByCreatedAtAsc } from '../../../../api/claims/utils';
import { getClaimModificationTimelineAction } from './get-claim-modification-timeline-action';
import { TimelineAction, TimelineItemInfo } from './model';

const getUnitTimelineAction = (modification: Modification): TimelineAction | null => {
    if (isClaimModification(modification)) {
        return getClaimModificationTimelineAction(modification.claimModificationType);
    }
    return null;
};

const isSame = (x: TimelineItemInfo, y: TimelineItemInfo): boolean =>
    x.action === y.action && x.userInfo.userType === y.userInfo.userType;

const concatLastItem = (acc: TimelineItemInfo[], info: TimelineItemInfo): TimelineItemInfo[] =>
    acc.length && isSame(info, acc[acc.length - 1])
        ? [
              ...acc.slice(0, -1),
              { ...info, modifications: [...acc[acc.length - 1].modifications, ...info.modifications] },
          ]
        : [...acc, info];

const deleteAddedFile = (info: TimelineItemInfo[], deletedFileId: string) => {
    for (let i = 0, item = info[0]; i < info.length; i += 1, item = info[i]) {
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
            info.splice(i, 1);
        } else {
            item.modifications.splice(fileModificationIdx, 1);
        }
        return info;
    }
    console.error(`Deleted file "${deletedFileId}" not found`);
    return info;
};

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
            return deleteAddedFile(
                acc,
                ((modification as ClaimModification).claimModificationType as FileModificationUnit).fileId
            );
        case TimelineAction.changesAdded:
        case TimelineAction.filesAdded:
        case TimelineAction.commentAdded:
            modifications.push(modification);
    }
    return concatLastItem(acc, { action, userInfo, createdAt: createdAt as any, modifications });
};

export const toTimelineInfo = (units: ModificationUnit[]): TimelineItemInfo[] =>
    Array.isArray(units) && units.length
        ? units.slice().sort(sortUnitsByCreatedAtAsc).reduce(reduceToAcceptedTimelineItem, [])
        : [];
