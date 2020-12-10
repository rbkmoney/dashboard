import { createContractPayoutToolModification } from '@dsh/api/claims/claim-party-modification';

import { InternationalBankAccount, PartyModification } from '../../../../api-codegen/claim-management';

export function createInternationalContractPayoutToolModification(
    id: string,
    payoutToolID: string,
    params: Omit<InternationalBankAccount, 'payoutToolModificationType' | 'payoutToolType'>
): PartyModification {
    return createContractPayoutToolModification(id, payoutToolID, {
        currency: {
            symbolicCode: 'USD',
        },
        toolInfo: {
            payoutToolModificationType: 'PayoutToolParams',
            payoutToolType: 'InternationalBankAccount', // not available in interfaces now. Can be found in swag
            ...params,
        } as any,
    });
}
