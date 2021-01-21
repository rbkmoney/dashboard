import { ContractorModification, PartyModification, PartyModificationType } from '@dsh/api-codegen/claim-management';
import { PARTY_MODIFICATION } from '@dsh/api/claims/claim-party-modification/consts';
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
