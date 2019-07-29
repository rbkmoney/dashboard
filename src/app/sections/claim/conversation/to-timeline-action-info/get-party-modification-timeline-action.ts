import { PartyModification } from '../../../../api/claim-management';
import { SpecificModificationUnit, getIsSpecificModificationUnit } from './specific-modification-unit';
import { TimelineAction } from './timeline-action';

const isPartyModificationUnit = getIsSpecificModificationUnit<PartyModification>();

export function getPartyModificationTimelineAction(unit: SpecificModificationUnit<PartyModification>) {
    return TimelineAction.changesAdded;
}
