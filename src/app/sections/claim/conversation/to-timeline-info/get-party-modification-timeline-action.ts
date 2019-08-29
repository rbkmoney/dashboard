import { PartyModification } from '../../../../api-codegen/claim-management';
import { SpecificModificationUnit } from './specific-modification-unit';
import { TimelineAction } from './timeline-action';

export function getPartyModificationTimelineAction(_unit: SpecificModificationUnit<PartyModification>) {
    return TimelineAction.changesAdded;
}
