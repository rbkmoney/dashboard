import { LegalEntityType, PartyModification, RussianLegalEntity } from '@dsh/api-codegen/claim-management';

import { RussianShopCreateData } from '../../../../sections/payment-section/integrations/shops/shop-creation/create-russian-shop-entity/types/russian-shop-create-data';
import { createContractorLegalEntityModification } from './create-contractor-legal-entity-modification';
import { createRussianBankAccountModification } from './create-russian-bank-account-modification';

export function createRussianLegalEntityModification(
    id: string,
    params: Omit<RussianLegalEntity, 'legalEntityType'>
): PartyModification {
    return createContractorLegalEntityModification(id, {
        legalEntityType: LegalEntityType.LegalEntityTypeEnum.RussianLegalEntity,
        ...params,
    });
}

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
