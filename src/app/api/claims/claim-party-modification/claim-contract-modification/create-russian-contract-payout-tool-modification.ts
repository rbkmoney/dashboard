import { PartyModification } from '../../../../api-codegen/claim-management';
import { PayoutToolInfo } from '../../../../api-codegen/dark-api';
import { createContractPayoutToolModification } from './create-contract-payout-tool-modification';

export function createRussianContractPayoutToolModification(
    id: string,
    payouToolID: string,
    params: Omit<PayoutToolInfo, 'payoutToolType' | 'payoutToolModificationType'>
): PartyModification {
    return createContractPayoutToolModification(id, payouToolID, {
        currency: {
            symbolicCode: 'RUB',
        },
        toolInfo: {
            payoutToolType: PayoutToolInfo.PayoutToolTypeEnum.RussianBankAccount,
            ...params,
        },
    });
}
