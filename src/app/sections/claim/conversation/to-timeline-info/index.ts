import get from 'lodash.get';
import * as moment from 'moment';

import { ModificationUnit, Modification, ClaimModification, PartyModification } from '../../../../api/claim-management';
import { TimelineAction } from './timeline-action';
import { TimelineItemInfo } from './timeline-item-info';
import { getTimelineActionIconName } from './get-timeline-action-icon-name';
import { getTimelineActionColor } from './get-timeline-action-color';
import { getTimelineActionName } from './get-timeline-action-name';
import { getClaimModificationTimelineAction } from './get-claim-modification-timeline-action';
import { SpecificModificationUnit } from './specific-modification-unit';
import { getPartyModificationTimelineAction } from './get-party-modification-timeline-action';

function sortUnits(units: ModificationUnit[]): ModificationUnit[] {
    return units.sort(({ createdAt: a }, { createdAt: b }) => moment(a).milliseconds() - moment(b).milliseconds());
}

function isModification<M extends Modification>(
    unit: ModificationUnit,
    type: Modification.ModificationTypeEnum
): unit is SpecificModificationUnit<M> {
    return get(unit, 'modification.modificationType') === type;
}

function getUnitTimelineAction(unit: ModificationUnit): TimelineAction {
    if (isModification<ClaimModification>(unit, 'ClaimModification')) {
        return getClaimModificationTimelineAction(unit);
    } else if (isModification<PartyModification>(unit, 'PartyModification')) {
        return getPartyModificationTimelineAction(unit);
    }
    console.error('Modification unidentified');
}

function toModificationUnitBatches(units: ModificationUnit[]): ModificationUnit[][] {
    return units.map(u => [u]);
}

export function toTimelineItemInfo(batch: ModificationUnit[]): TimelineItemInfo {
    const [firstUnit] = batch;
    const lastUnit = batch[batch.length - 1];
    const action = getUnitTimelineAction(firstUnit);
    const createdAt: string = lastUnit.createdAt as any;
    return {
        action,
        actionName: getTimelineActionName(action),
        author: 'common.claim.modification.author.manager',
        createdAt,
        iconName: getTimelineActionIconName(action),
        color: getTimelineActionColor(action)
    };
}

export function toTimelineInfo(units: ModificationUnit[]): TimelineItemInfo[] {
    const sortedUnits = sortUnits(units);
    const batches = toModificationUnitBatches(sortedUnits);
    return batches.map(toTimelineItemInfo);
}
