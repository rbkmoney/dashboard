import { LegalEntityType, PartyModification, RussianLegalEntity } from '@dsh/api-codegen/claim-management';

import { createContractorLegalEntityModification } from './create-contractor-legal-entity-modification';

export function createRussianLegalEntityModification(
    id: string,
    params: Omit<RussianLegalEntity, 'legalEntityType'>
): PartyModification {
    return createContractorLegalEntityModification(id, {
        legalEntityType: LegalEntityType.LegalEntityTypeEnum.RussianLegalEntity,
        ...params,
    });
}
