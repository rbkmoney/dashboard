import get from 'lodash.get';
import * as moment from 'moment';

import { ModificationUnit, Modification, ClaimModification, PartyModification } from '../../../../api/claim-management';
import { TimelineAction } from './timeline-action';
import { TimelineActionInfo } from './timeline-action-info';
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

export function toTimelineActionInfo(unit: ModificationUnit): TimelineActionInfo {
    const action = getUnitTimelineAction(unit);
    return {
        action,
        actionName: getTimelineActionName(action),
        author: 'common.claim.modification.author.manager',
        createdAt: (unit.createdAt as any) as string,
        iconName: getTimelineActionIconName(action),
        color: getTimelineActionColor(action)
    };
}

export function toTimelineActionsInfo(units: ModificationUnit[]): TimelineActionInfo[] {
    return sortUnits(units).map(toTimelineActionInfo);
}
