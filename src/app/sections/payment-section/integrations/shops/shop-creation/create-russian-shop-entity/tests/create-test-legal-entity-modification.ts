import { PartyModification } from '@dsh/api-codegen/claim-management';
import {
    createRussianBankAccountModification,
    createRussianLegalEntityModification,
} from '@dsh/api/claims/claim-party-modification';

import { RussianShopCreateData } from '../types/russian-shop-create-data';

export function createTestLegalEntityModification(id: string, data: RussianShopCreateData): PartyModification {
    const {
        actualAddress,
        bankAccount: russianBankAccount,
        inn,
        postAddress,
        registeredName,
        registeredNumber,
        representativeDocument,
        representativeFullName,
        representativePosition,
    } = data.contract.contractor as any;

    return createRussianLegalEntityModification(id, {
        actualAddress,
        russianBankAccount: createRussianBankAccountModification(russianBankAccount),
        inn,
        postAddress,
        registeredName,
        registeredNumber,
        representativeDocument,
        representativeFullName,
        representativePosition,
    } as any);
}
