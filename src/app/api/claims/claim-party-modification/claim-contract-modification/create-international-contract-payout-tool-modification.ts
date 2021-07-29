import { InternationalBankAccount, PartyModification, PayoutToolInfo } from '@dsh/api-codegen/claim-management';
import { createContractPayoutToolCreationModification } from '@dsh/api/claims/claim-party-modification';

import PayoutToolTypeEnum = PayoutToolInfo.PayoutToolTypeEnum;

export function createInternationalContractPayoutToolModification(
    id: string,
    payoutToolID: string,
    symbolicCode: string,
    params: Omit<InternationalBankAccount, 'payoutToolType'>
): PartyModification {
    return createContractPayoutToolCreationModification(id, payoutToolID, {
        currency: {
            symbolicCode,
        },
        toolInfo: {
            payoutToolType: PayoutToolTypeEnum.InternationalBankAccount,
            ...params,
        },
    });
}
