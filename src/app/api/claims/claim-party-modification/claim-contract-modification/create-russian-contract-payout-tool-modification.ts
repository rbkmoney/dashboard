import { PartyModification, PayoutToolInfo, PayoutToolModification } from '@dsh/api-codegen/claim-management';

import { RussianShopCreateData } from '../../../../sections/payment-section/integrations/shops/shop-creation/create-russian-shop-entity/types/russian-shop-create-data';
import { createContractPayoutToolModification } from './create-contract-payout-tool-modification';
import PayoutToolModificationTypeEnum = PayoutToolModification.PayoutToolModificationTypeEnum;

export function createRussianContractPayoutToolModification(
    id: string,
    payoutToolID: string,
    params: Omit<PayoutToolInfo, 'payoutToolType' | 'payoutToolModificationType'>
): PartyModification {
    return createContractPayoutToolModification(id, payoutToolID, {
        currency: {
            symbolicCode: 'RUB',
        },
        toolInfo: {
            payoutToolModificationType: PayoutToolModificationTypeEnum.Creation,
            payoutToolType: PayoutToolInfo.PayoutToolTypeEnum.RussianBankAccount,
            ...params,
        },
    });
}

export function createTestRussianContractPayoutToolModification(
    id: string,
    payoutToolID: string,
    { bankAccount: { account, bankName, bankPostAccount, bankBik } }: RussianShopCreateData
): PartyModification {
    return createRussianContractPayoutToolModification(id, payoutToolID, {
        account,
        bankName,
        bankPostAccount,
        bankBik,
    });
}
