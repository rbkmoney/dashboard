import { PartyModification } from '@dsh/api-codegen/claim-management';
import { createRussianContractPayoutToolCreationModification } from '@dsh/api/claims/claim-party-modification';

import { RussianShopCreateData } from '../types/russian-shop-create-data';

export function createTestRussianContractPayoutToolModification(
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
