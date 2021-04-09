import { PartyModification } from '@dsh/api-codegen/claim-management';
import { createInternationalLegalEntityModification } from '@dsh/api/claims/claim-party-modification';

import { InternationalShopEntityFormValue } from '../types/international-shop-entity-form-value';

export function createTestInternationalLegalEntityModification(
    id: string,
    { organizationName: legalName, tradingName, registeredAddress, actualAddress }: InternationalShopEntityFormValue
): PartyModification {
    return createInternationalLegalEntityModification(id, {
        legalName,
        registeredNumber: '', // add ui field or remove it
        registeredAddress,
        tradingName,
        actualAddress,
    });
}
