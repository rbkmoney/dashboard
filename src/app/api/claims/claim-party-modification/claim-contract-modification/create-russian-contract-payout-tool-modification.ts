import { PartyModification, PayoutToolInfo, RussianBankAccount } from '@dsh/api-codegen/claim-management';

import { RussianShopCreateData } from '../../../../sections/payment-section/integrations/shops/shop-creation/create-russian-shop-entity/types/russian-shop-create-data';
import { createContractPayoutToolModification } from './create-contract-payout-tool-modification';

export function createRussianContractPayoutToolModification(
    id: string,
    payoutToolID: string,
    params: Omit<RussianBankAccount, 'payoutToolType'>
): PartyModification {
    return createContractPayoutToolModification(id, payoutToolID, {
        currency: {
            symbolicCode: 'RUB',
        },
        toolInfo: {
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
