import { InternationalLegalEntity, PartyModification } from '../../../../api-codegen/claim-management';
import { createContractorLegalEntityModification } from './create-contractor-legal-entity-modification';

export function createInternationalLegalEntityModification(
    id: string,
    params: Omit<InternationalLegalEntity, 'legalEntityType'>
): PartyModification {
    return createContractorLegalEntityModification(id, {
        legalEntityType: 'InternationalLegalEntity',
        ...params,
    });
}
