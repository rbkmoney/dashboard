import {
    ModificationUnit,
    Modification,
    ClaimModification,
    PartyModification
} from '../../../../api-codegen/claim-management';
import { TimelineAction } from './timeline-action';
import { getClaimModificationTimelineAction } from './get-claim-modification-timeline-action';
import { getPartyModificationTimelineAction } from './get-party-modification-timeline-action';
import { SpecificModificationUnit } from './specific-modification-unit';
import { TimelineItemInfo } from './timeline-item-info';
import { getTimelineActionColor } from './get-timeline-action-color';
import { Author } from './author';

function getUnitTimelineAction(unit: ModificationUnit): TimelineAction {
    switch (unit.modification.modificationType) {
        case Modification.ModificationTypeEnum.ClaimModification:
            return getClaimModificationTimelineAction(unit as SpecificModificationUnit<ClaimModification>);
        case Modification.ModificationTypeEnum.PartyModification:
            return getPartyModificationTimelineAction(unit as SpecificModificationUnit<PartyModification>);
    }
    console.error('Modification unidentified');
}

export function toTimelineItemInfo(batch: SpecificModificationUnit[]): TimelineItemInfo {
    if (!Array.isArray(batch)) {
        throw new Error("It's not a batch");
    }
    if (!batch.length) {
        return;
    }
    const [firstUnit] = batch;
    const lastUnit = batch[batch.length - 1];
    const action = getUnitTimelineAction(firstUnit);
    if (action === undefined || action === null) {
        throw new Error('No action');
    }
    return {
        action,
        author: Author.manager,
        createdAt: lastUnit.createdAt as any,
        color: getTimelineActionColor(action)
    };
}
