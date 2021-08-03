import { PartyContent } from '@dsh/api-codegen/aggr-proxy';
import { LegalEntityContractor, LegalRegistrationInfo, RussianLegalEntity } from '@dsh/api-codegen/questionary';

import { Replace } from '../../../../../../../type-utils';

type RussianLegalEntityContractor = Replace<
    LegalEntityContractor,
    { legalEntity: Replace<RussianLegalEntity, { registrationInfo?: LegalRegistrationInfo }> }
>;

export function createLegalEntityContractor({ inn, name }: PartyContent): RussianLegalEntityContractor {
    return {
        contractorType: 'LegalEntityContractor',
        legalEntity: {
            legalEntityType: 'RussianLegalEntity',
            name: name.shortName,
            inn,
        },
    };
}
