import { PartyModification } from '../../../../api/claim-management';
import { SpecificModificationUnit } from './specific-modification-unit';
import { TimelineAction } from './timeline-action';

export function getPartyModificationTimelineAction(unit: SpecificModificationUnit<PartyModification>) {
    return TimelineAction.changesAdded;
}
