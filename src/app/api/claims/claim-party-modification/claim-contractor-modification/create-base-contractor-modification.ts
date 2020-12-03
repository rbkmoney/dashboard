import { PARTY_MODIFICATION } from '@dsh/api/claims/claim-party-modification/consts';

import {
    ContractorModification,
    PartyModification,
    PartyModificationType,
} from '../../../../api-codegen/claim-management';
import PartyModificationTypeEnum = PartyModificationType.PartyModificationTypeEnum;

export function createBaseContractorModification(
    modification: Omit<ContractorModification, 'contractorModificationType'>
): PartyModification {
    return {
        ...PARTY_MODIFICATION,
        partyModificationType: {
            partyModificationType: PartyModificationTypeEnum.ContractorModificationUnit,
            ...modification,
        },
    };
}
