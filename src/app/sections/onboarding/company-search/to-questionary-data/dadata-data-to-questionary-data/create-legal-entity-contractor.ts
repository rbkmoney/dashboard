import { Replace } from '../../../../../../type-utils';
import { PartyContent } from '../../../../../api-codegen/aggr-proxy';
import {
    RussianLegalEntity,
    LegalRegistrationInfo,
    LegalEntityContractor
} from '../../../../../api-codegen/questionary';

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
            inn
        }
    };
}
