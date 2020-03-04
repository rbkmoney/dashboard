import { Overwrite } from 'utility-types';

import { PartyContent } from '../../../../../api-codegen/aggr-proxy';
import {
    RussianLegalEntity,
    LegalRegistrationInfo,
    LegalEntityContractor
} from '../../../../../api-codegen/questionary';

type RussianLegalEntityContractor = Overwrite<
    LegalEntityContractor,
    { legalEntity: Overwrite<RussianLegalEntity, { registrationInfo?: LegalRegistrationInfo }> }
>;

export function createLegalEntityContractor({ inn, name }: PartyContent): RussianLegalEntityContractor {
    return {
        contractorType: 'LegalEntityContractor',
        legalEntity: {
            legalEntityType: 'RussianLegalEntity',
            name: name.shortName,
            inn
        }
    };
}
