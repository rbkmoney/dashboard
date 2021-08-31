import { Overwrite } from 'utility-types';

import { PartyContent, OrgType } from '@dsh/api-codegen/aggr-proxy';
import { LegalEntityContractor, LegalRegistrationInfo, RussianLegalEntity } from '@dsh/api-codegen/questionary';

type RussianLegalEntityContractor = Overwrite<
    LegalEntityContractor,
    { legalEntity: Overwrite<RussianLegalEntity, { registrationInfo?: LegalRegistrationInfo }> }
>;

export function isLegalOrg(content: PartyContent): content is PartyContent {
    return content.orgType === OrgType.Legal;
}

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
