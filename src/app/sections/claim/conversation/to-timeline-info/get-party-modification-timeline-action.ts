import get from 'lodash.get';

import { PartyModification } from '../../../../api-codegen/claim-management';
import { SpecificModificationUnit } from '../../../../api/claims/utils';
import { TimelineAction } from './timeline-action';

export function getPartyModificationTimelineAction(unit: SpecificModificationUnit<PartyModification>) {
    const modification = get(unit, ['modification', 'partyModificationType']);
    if (!modification) {
        throw new Error('Modification unit is incomplete');
    }
    switch (modification.partyModificationType) {
        case 'ContractModificationUnit':
        case 'ContractorModificationUnit':
        case 'ShopModificationUnit':
            return TimelineAction.changesAdded;
    }
    throw new Error('Party modification unidentified');
}
