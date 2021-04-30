import {
    ContractModification,
    ContractPayoutToolModification,
    PartyModification,
} from '@dsh/api-codegen/claim-management';

import { createBaseContractModification } from './create-base-contract-modification';

export function createContractPayoutToolCreationModification(
    id: string,
    payoutToolID: string,
    params: Omit<ContractPayoutToolModification, 'payoutToolModificationType'>
): PartyModification {
    return {
        ...createBaseContractModification({
            id,
            modification: {
                contractModificationType:
                    ContractModification.ContractModificationTypeEnum.ContractPayoutToolModificationUnit,
                payoutToolID,
                modification: {
                    payoutToolModificationType:
                        ContractPayoutToolModification.PayoutToolModificationTypeEnum
                            .ContractPayoutToolCreationModification,
                    ...params,
                },
            } as ContractModification,
        }),
    };
}
