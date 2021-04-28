import { PartyModification, PayoutToolInfo, RussianBankAccount } from '@dsh/api-codegen/claim-management';

import { RussianShopCreateData } from '../../../../sections/payment-section/integrations/shops/shop-creation/create-russian-shop-entity/types/russian-shop-create-data';
import { createContractPayoutToolCreationModification } from './create-contract-payout-tool-creation-modification';

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

export function createTestRussianContractPayoutToolCreationModification(
    id: string,
    payoutToolID: string,
    { bankAccount: { account, bankName, bankPostAccount, bankBik } }: RussianShopCreateData
): PartyModification {
    return createRussianContractPayoutToolCreationModification(id, payoutToolID, {
        account,
        bankName,
        bankPostAccount,
        bankBik,
    });
}
