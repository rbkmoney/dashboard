import { Modification, ShopModification, ShopAccountCreationModification } from '@dsh/api-codegen/claim-management';

import {
    createRussianLegalEntityModification,
    createRussianBankAccountModification,
    createContractCreationModification,
    createRussianContractPayoutToolCreationModification,
    createShopCreationModification,
    makeShopLocation,
} from '../claim-party-modification';
import { createBaseShopModification } from '../claim-party-modification/claim-shop-modification/create-base-shop-modification';

import ShopModificationTypeEnum = ShopModification.ShopModificationTypeEnum;

const RUSSIAN_BANK_ACCOUNT = {
    account: '00000000000000000000',
    bankName: 'Test bank name',
    bankPostAccount: '00000000000000000000',
    bankBik: '000000000',
};

export const createTestShopClaimChangeset = (
    testShopID: string,
    testContractID: string,
    testPayoutToolID: string,
    testContractorID: string
): Modification[] => {
    return [
        createRussianLegalEntityModification(testContractorID, {
            actualAddress: 'Test actual address',
            russianBankAccount: createRussianBankAccountModification(RUSSIAN_BANK_ACCOUNT),
            inn: '0000000000',
            postAddress: 'Test post address',
            registeredName: 'Test registered name',
            registeredNumber: '0000000000000',
            representativeDocument: 'Test representative document',
            representativeFullName: 'Test representative full name',
            representativePosition: 'Test representative position',
        }),
        createContractCreationModification(testContractID, {
            contractorID: testContractorID,
            paymentInstitution: { id: 1 },
        }),
        createRussianContractPayoutToolCreationModification(testContractID, testPayoutToolID, RUSSIAN_BANK_ACCOUNT),
        createShopCreationModification(testShopID, {
            category: { categoryID: 1 },
            location: makeShopLocation({ url: 'http://test.url' }),
            details: { name: 'Test shop' },
            contractID: testContractID,
            payoutToolID: testPayoutToolID,
        }),
        createBaseShopModification({
            id: testShopID,
            modification: {
                shopModificationType: ShopModificationTypeEnum.ShopAccountCreationModification,
                currency: { symbolicCode: 'RUB' },
            } as ShopAccountCreationModification,
        }),
    ];
};
