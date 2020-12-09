import { PARTY_MODIFICATION } from '@dsh/api/claims/claim-party-modification/consts';

import {
    ContractModificationUnit,
    PartyModification,
    PartyModificationType,
} from '../../../../api-codegen/claim-management';
import PartyModificationTypeEnum = PartyModificationType.PartyModificationTypeEnum;

export function createBaseContractModification(
    modification: Omit<ContractModificationUnit, 'partyModificationType'>
): PartyModification {
    return {
        ...PARTY_MODIFICATION,
        partyModificationType: {
            partyModificationType: PartyModificationTypeEnum.ContractModificationUnit,
            ...modification,
        },
    };
}
