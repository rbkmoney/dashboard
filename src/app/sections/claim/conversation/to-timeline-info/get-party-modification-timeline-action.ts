import { PartyModification } from '../../../../api-codegen/claim-management';
import { SpecificModificationUnit } from '../../../../api/claims/utils';
import { TimelineAction } from './timeline-action';

const PartyModificationType = PartyModification.PartyModificationTypeEnum;

export function getPartyModificationTimelineAction(unit: SpecificModificationUnit<PartyModification>) {
    if (!unit || !unit.modification || !unit.modification.partyModificationType) {
        throw new Error('Modification unit is incomplete');
    }
    switch (unit.modification.partyModificationType) {
        case PartyModificationType.ContractModificationUnit:
        case PartyModificationType.ContractorModificationUnit:
        case PartyModificationType.ShopModificationUnit:
            return TimelineAction.changesAdded;
    }
    throw new Error('Party modification unidentified');
}
