import { createContractPayoutToolModification } from '@dsh/api/claims/claim-party-modification';

import {
    InternationalBankAccount,
    PartyModification,
    PayoutToolInfo,
    PayoutToolModification,
} from '../../../../api-codegen/claim-management';
import PayoutToolTypeEnum = PayoutToolInfo.PayoutToolTypeEnum;
import PayoutToolModificationTypeEnum = PayoutToolModification.PayoutToolModificationTypeEnum;

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
            payoutToolModificationType: PayoutToolModificationTypeEnum.Creation,
            payoutToolType: PayoutToolTypeEnum.InternationalBankAccount,
            ...params,
        },
    });
}
