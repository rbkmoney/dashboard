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
    createRussianContractPayoutToolModification,
} from '../claim-contract-modification';
import {
    createRussianBankAccountModification,
    createRussianLegalEntityModification,
} from '../claim-contractor-modification';
import { createContractLegalAgreementBindingModification } from '../claim-contractor-modification/create-contract-legal-agreement-binding-modification';
import { createShopCreationModification, makeShopLocation } from '../claim-shop-modification';

const testRussianBankAccount: Omit<RussianBankAccount, 'payoutToolType'> = {
    account: '00000000000000000000',
    bankName: 'Test bank name',
    bankPostAccount: '00000000000000000000',
    bankBik: '000000000',
};

const testRussianLegalEntity: Omit<RussianLegalEntity, 'legalEntityType'> = {
    registeredName: 'Test registered name',
    registeredNumber: '0000000000000',
    inn: '0000000000',
    actualAddress: 'Test actual address',
    postAddress: 'Test post address',
    representativePosition: 'Test representative position',
    representativeFullName: 'Test representative full name',
    representativeDocument: 'Test representative document',
    russianBankAccount: createRussianBankAccountModification(testRussianBankAccount),
};

const createTestLegalAgreement = (): LegalAgreement => ({
    signedAt: moment().subtract(1, 'days').utc().format(),
    legalAgreementID: '000000/00',
});

const testShopCreation: Omit<ShopCreationModification, 'shopModificationType' | 'contractID' | 'payoutToolID'> = {
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
    createRussianLegalEntityModification(contractorID, testRussianLegalEntity),
    createRussianContractPayoutToolModification(contractID, payoutToolID, testRussianBankAccount),
    createContractLegalAgreementBindingModification(createTestLegalAgreement()),
    createContractCreationModification(contractID, { contractorID }),
    createShopCreationModification(shopID, { ...testShopCreation, contractID, payoutToolID }),
];
