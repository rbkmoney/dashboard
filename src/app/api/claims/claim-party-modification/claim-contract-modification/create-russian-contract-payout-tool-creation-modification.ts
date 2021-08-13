import { PartyModification, PayoutToolInfo, RussianBankAccount } from '@dsh/api-codegen/claim-management';
import { createContractPayoutToolCreationModification } from '@dsh/api/claims/claim-party-modification';

export function createRussianContractPayoutToolCreationModification(
    id: string,
    payoutToolID: string,
    params: Omit<RussianBankAccount, 'payoutToolType'>
): PartyModification {
    return createContractPayoutToolCreationModification(id, payoutToolID, {
        currency: {
            symbolicCode: 'RUB',
        },
        toolInfo: {
            payoutToolType: PayoutToolInfo.PayoutToolTypeEnum.RussianBankAccount,
            ...params,
        },
    });
}
