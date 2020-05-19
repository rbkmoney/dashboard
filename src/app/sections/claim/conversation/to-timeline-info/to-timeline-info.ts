import { ClaimModification, Modification, ModificationUnit } from '../../../../api-codegen/claim-management';
import { sortUnitsByCreatedAtAsc } from '../../../../api/claims/utils';
import { getClaimModificationTimelineAction } from './get-claim-modification-timeline-action';
import { TimelineAction, TimelineItemInfo } from './model';

const getUnitTimelineAction = (modification: Modification): TimelineAction | null => {
    switch (modification.modificationType) {
        case 'ClaimModification':
            return getClaimModificationTimelineAction((modification as ClaimModification).claimModificationType);
        case 'PartyModification':
            return null;
    }
};

const isSame = (x: TimelineItemInfo, y: TimelineItemInfo): boolean =>
    x.action === y.action && x.userInfo.userType === y.userInfo.userType;

const concatLastItem = (acc: TimelineItemInfo[], updateItem: TimelineItemInfo): TimelineItemInfo[] =>
    acc.map((accItem, accItemIndex) =>
        accItemIndex === acc.length - 1
            ? {
                  ...updateItem,
                  modifications: accItem.modifications.concat(updateItem.modifications),
              }
            : accItem
    );

const toTimelineInfoModifications = (action: TimelineAction, modification: Modification): Modification[] => {
    switch (action) {
        case 'changesAdded':
        case 'filesAdded':
        case 'commentAdded':
            return [modification];
        default:
            return [];
    }
};

const acceptTimelineItem = (
    acc: TimelineItemInfo[],
    { createdAt, modification, userInfo }: ModificationUnit
): TimelineItemInfo[] => {
    const action = getUnitTimelineAction(modification);
    if (action === null) {
        return acc;
    }
    const modifications = toTimelineInfoModifications(action, modification);
    const result = {
        action,
        userInfo,
        createdAt: createdAt as any,
        modifications,
    };
    if (acc.length !== 0 && modifications.length !== 0) {
        const lastItem = acc[acc.length - 1];
        if (isSame(result, lastItem)) {
            return concatLastItem(acc, result);
        }
    }
    return acc.concat(result);
};

export const toTimelineInfo = (units: ModificationUnit[]): TimelineItemInfo[] => {
    if (!units || units.length === 0) {
        return [];
    }
    const sortedUnits = sortUnitsByCreatedAtAsc(units);
    return sortedUnits.reduce(acceptTimelineItem, []);
};
