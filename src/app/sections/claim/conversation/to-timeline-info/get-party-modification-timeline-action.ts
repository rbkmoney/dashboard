import { PartyModification } from '../../../../api/claim-management';
import { SpecificModificationUnit } from './specific-modification-unit';
import { TimelineAction } from './timeline-action';

export function getPartyModificationTimelineAction(unit: SpecificModificationUnit<PartyModification>) {
    if (!unit || !unit.modification || !unit.modification.partyModificationType) {
        throw new Error('Modification unit is incomplete');
    }
    const PartyModificationType = PartyModification.PartyModificationTypeEnum;
    switch (unit.modification.partyModificationType) {
        case PartyModificationType.ContractModificationUnit:
        case PartyModificationType.ContractorModificationUnit:
        case PartyModificationType.ShopModificationUnit:
            return TimelineAction.changesAdded;
    }
    throw new Error('Party modification unidentified');
}
