import { ContractModification, PartyModification } from '@dsh/api-codegen/claim-management';

import { createBaseContractModification } from './create-base-contract-modification';

export function createContractorParamsModification(
    id: string,
    params: Omit<ContractModification, 'contractModificationType'>
): PartyModification {
    return {
        ...createBaseContractModification({
            id,
            modification: {
                contractModificationType:
                    ContractModification.ContractModificationTypeEnum.ContractCreationModification,
                ...params,
            },
        }),
    };
}

export function createTestContractorModification(id: string, contractorID: string): PartyModification {
    return createContractorParamsModification(id, {
        contractorID,
    });
}
