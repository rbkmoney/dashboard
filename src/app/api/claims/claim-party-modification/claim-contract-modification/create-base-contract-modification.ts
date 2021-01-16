import { ContractModificationUnit, PartyModification, PartyModificationType } from '@dsh/api-codegen/claim-management';
import { PARTY_MODIFICATION } from '@dsh/api/claims/claim-party-modification/consts';
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
