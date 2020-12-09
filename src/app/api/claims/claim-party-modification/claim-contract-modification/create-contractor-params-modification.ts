import { ContractModification, ContractParams, PartyModification } from '@dsh/api-codegen/claim-management';

import { createBaseContractModification } from './create-base-contract-modification';

export function createContractorParamsModification(
    id: string,
    params: Omit<ContractParams, 'contractModificationType'>
): PartyModification {
    return {
        ...createBaseContractModification({
            id,
            modification: {
                contractModificationType: ContractModification.ContractModificationTypeEnum.ContractParams,
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
