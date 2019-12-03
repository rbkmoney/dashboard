import { ModificationUnit, ClaimModification, Modification } from '../../../../api-codegen/claim-management';
import { TimelineItemInfo, TimelineAction } from './model';
import { sortUnitsByCreatedAtAsc } from '../../../../api/claims/utils';
import { getClaimModificationTimelineAction } from './get-claim-modification-timeline-action';

const getUnitTimelineAction = (modification: Modification): TimelineAction | null => {
    switch (modification.modificationType) {
        case 'ClaimModification':
            return getClaimModificationTimelineAction((modification as ClaimModification).claimModificationType);
        case 'PartyModification':
            return TimelineAction.changesAdded;
    }
};

const isSame = (x: TimelineItemInfo, y: TimelineItemInfo): boolean =>
    x.action === y.action && x.userInfo.userType === y.userInfo.userType;

const updateLastItem = (acc: TimelineItemInfo[], updateItem: TimelineItemInfo): TimelineItemInfo[] =>
    acc.map((accItem, accItemIndex) =>
        accItemIndex === acc.length - 1
            ? {
                  ...updateItem,
                  modifications: accItem.modifications.concat(updateItem.modifications)
              }
            : accItem
    );

const acceptTimelineItem = (
    acc: TimelineItemInfo[],
    { createdAt, modification, userInfo }: ModificationUnit
): TimelineItemInfo[] => {
    const action = getUnitTimelineAction(modification);
    if (action === null) {
        return acc;
    }
    const item = {
        action,
        userInfo,
        createdAt: createdAt as any,
        modifications: [modification]
    };
    if (acc.length !== 0) {
        const lastItem = acc[acc.length - 1];
        if (isSame(item, lastItem)) {
            return updateLastItem(acc, item);
        }
    }
    return acc.concat(item);
};

export const toTimelineInfo = (units: ModificationUnit[]): TimelineItemInfo[] => {
    if (!units || units.length === 0) {
        return [];
    }
    const sortedUnits = sortUnitsByCreatedAtAsc(units);
    return sortedUnits.reduce(acceptTimelineItem, []);
};
