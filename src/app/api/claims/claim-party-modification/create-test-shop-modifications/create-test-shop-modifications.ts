import moment from 'moment';

import {
    LegalAgreement,
    Modification,
    RussianBankAccount,
    RussianLegalEntity,
    ShopCreationModification,
} from '../../../../api-codegen/claim-management';
import {
    createContractCreationModification,
    createRussianContractPayoutToolCreationModification,
} from '../claim-contract-modification';
import { createContractLegalAgreementBindingModification } from '../claim-contract-modification/create-contract-legal-agreement-binding-modification';
import {
    createRussianBankAccountModification,
    createRussianLegalEntityModification,
} from '../claim-contractor-modification';
import { createShopCreationModification, makeShopLocation } from '../claim-shop-modification';

const TEST_RUSSIAN_BANK_ACCOUNT: Omit<RussianBankAccount, 'payoutToolType'> = {
    account: '00000000000000000000',
    bankName: 'Test bank name',
    bankPostAccount: '00000000000000000000',
    bankBik: '000000000',
};

const TEST_RUSSIAN_LEGAL_ENTITY: Omit<RussianLegalEntity, 'legalEntityType'> = {
    registeredName: 'Test registered name',
    registeredNumber: '0000000000000',
    inn: '0000000000',
    actualAddress: 'Test actual address',
    postAddress: 'Test post address',
    representativePosition: 'Test representative position',
    representativeFullName: 'Test representative full name',
    representativeDocument: 'Test representative document',
    russianBankAccount: createRussianBankAccountModification(TEST_RUSSIAN_BANK_ACCOUNT),
};

const createTestLegalAgreement = (): LegalAgreement => ({
    signedAt: moment().subtract(1, 'days').utc().format(),
    legalAgreementID: '000000/00',
});

const TEST_SHOP_CREATION: Omit<ShopCreationModification, 'shopModificationType' | 'contractID' | 'payoutToolID'> = {
    category: {
        categoryID: 1,
    },
    location: makeShopLocation({ url: 'http://test.url' }),
    details: {
        name: 'Test shop',
        description: 'Shop for test integration',
    },
};

export const createTestShopModifications = ({
    contractorID,
    contractID,
    shopID,
    payoutToolID,
}: {
    contractorID: string;
    contractID: string;
    shopID: string;
    payoutToolID: string;
}): Modification[] => [
    createRussianLegalEntityModification(contractorID, TEST_RUSSIAN_LEGAL_ENTITY),
    createContractCreationModification(contractID, { contractorID }),
    createContractLegalAgreementBindingModification(contractID, createTestLegalAgreement()),
    createRussianContractPayoutToolCreationModification(contractID, payoutToolID, TEST_RUSSIAN_BANK_ACCOUNT),
    createShopCreationModification(shopID, { ...TEST_SHOP_CREATION, contractID, payoutToolID }),
];
