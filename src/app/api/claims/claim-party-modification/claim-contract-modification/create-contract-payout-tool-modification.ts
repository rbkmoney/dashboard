import { ContractModification, PartyModification, PayoutToolParams } from '@dsh/api-codegen/claim-management';
// import { PayoutToolParams } from '@dsh/api-codegen/dark-api';

import { createBaseContractModification } from './create-base-contract-modification';

export function createContractPayoutToolModification(
    id: string,
    payoutToolID: string,
    params: Omit<PayoutToolParams, 'payoutToolModificationType'>
): PartyModification {
    return {
        ...createBaseContractModification({
            id,
            modification: {
                contractModificationType: ContractModification.ContractModificationTypeEnum.PayoutToolModificationUnit,
                payoutToolID,
                modification: {
                    payoutToolModificationType: 'PayoutToolParams', // api generates wrong enum
                    ...params,
                },
            } as ContractModification,
        }),
    };
}
