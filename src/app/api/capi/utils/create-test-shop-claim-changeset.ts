import moment from 'moment';

import {
    ClaimChangeset,
    ContractCreation,
    ContractLegalAgreementBinding,
    Contractor,
    ContractPayoutToolCreation,
    LegalAgreement,
    PayoutToolDetails,
    PayoutToolDetailsBankAccount,
    RussianLegalEntity,
    ShopAccountCreation,
    ShopCategoryChange,
    ShopCreation,
    ShopLocationUrl,
} from '@dsh/api-codegen/capi';

const DEFAULT_CLAIM_CONTRACTOR: RussianLegalEntity = {
    contractorType: 'LegalEntity',
    entityType: 'RussianLegalEntity',
    registeredName: 'Test registered name',
    registeredNumber: '0000000000000',
    inn: '0000000000',
    actualAddress: 'Test actual address',
    postAddress: 'Test post address',
    representativePosition: 'Test representative position',
    representativeFullName: 'Test representative full name',
    representativeDocument: 'Test representative document',
    bankAccount: {
        account: '00000000000000000000',
        bankName: 'Test bank name',
        bankPostAccount: '00000000000000000000',
        bankBik: '000000000',
    },
};

const DEFAULT_PAYOUT_TOOL_DETAILS: PayoutToolDetailsBankAccount = {
    detailsType: 'PayoutToolDetailsBankAccount',
    account: '00000000000000000000',
    bankName: 'Test bank name',
    bankPostAccount: '00000000000000000000',
    bankBik: '000000000',
};

const DEFAULT_LEGAL_AGREEMENT: LegalAgreement = {
    id: '000000/00',
    signedAt: moment().subtract(1, 'days').utc().format() as any,
};

const contractCreationChange = (
    contractID: string,
    paymentInstitutionID: number,
    contractor?: Contractor
): ContractCreation => {
    return {
        partyModificationType: 'ContractModification',
        contractID,
        contractModificationType: 'ContractCreation',
        paymentInstitutionID,
        contractor: contractor || DEFAULT_CLAIM_CONTRACTOR,
    };
};

const contractPayoutToolCreationChange = (
    contractID: string,
    payoutToolID: string,
    currency: string,
    details?: PayoutToolDetails
) => {
    return {
        partyModificationType: 'ContractModification',
        contractID,
        contractModificationType: 'ContractPayoutToolCreation',
        payoutToolID,
        currency,
        details: details || DEFAULT_PAYOUT_TOOL_DETAILS,
    } as ContractPayoutToolCreation;
};

const contractLegalAgreementBindingChange = (
    contractID: string,
    legalAgreement?: LegalAgreement
): ContractLegalAgreementBinding => {
    return {
        partyModificationType: 'ContractModification',
        contractID,
        contractModificationType: 'ContractLegalAgreementBinding',
        legalAgreement: legalAgreement || DEFAULT_LEGAL_AGREEMENT,
    };
};

const shopCreationChange = (shopID: string, contractID: string, payoutToolID: string): ShopCreation => {
    return {
        partyModificationType: 'ShopModification',
        shopID,
        shopModificationType: 'ShopCreation',
        location: {
            locationType: 'ShopLocationUrl',
            url: 'http://test.url',
        } as ShopLocationUrl,
        details: {
            name: 'Test shop',
            description: 'Shop for test integration',
        },
        contractID,
        payoutToolID,
    };
};

const shopCategoryChange = (shopID: string, categoryID: number): ShopCategoryChange => {
    return {
        partyModificationType: 'ShopModification',
        shopID,
        shopModificationType: 'ShopCategoryChange',
        categoryID,
    };
};

const shopAccountCreationChange = (shopID: string, currency: string): ShopAccountCreation => {
    return {
        partyModificationType: 'ShopModification',
        shopID,
        shopModificationType: 'ShopAccountCreation',
        currency,
    };
};

export const createTestShopClaimChangeset = (
    testShopID: string,
    testContractID: string,
    testPayoutToolID: string
): ClaimChangeset => {
    return [
        contractCreationChange(testContractID, 1),
        contractPayoutToolCreationChange(testContractID, testPayoutToolID, 'RUB'),
        contractLegalAgreementBindingChange(testContractID),
        shopCreationChange(testShopID, testContractID, testPayoutToolID),
        shopCategoryChange(testShopID, 1),
        shopAccountCreationChange(testShopID, 'RUB'),
    ];
};
