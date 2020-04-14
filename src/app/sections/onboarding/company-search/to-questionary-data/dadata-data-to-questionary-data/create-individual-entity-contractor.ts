import { Replace } from '../../../../../../type-utils';
import { PartyContent } from '../../../../../api-codegen/aggr-proxy';
import {
    IndividualEntityContractor,
    IndividualRegistrationInfo,
    RussianIndividualEntity
} from '../../../../../api-codegen/questionary';

type RussianIndividualEntityContractor = Replace<
    IndividualEntityContractor,
    { individualEntity: Replace<RussianIndividualEntity, { registrationInfo?: IndividualRegistrationInfo }> }
>;

export function createIndividualEntityContractor({ inn, name }: PartyContent): RussianIndividualEntityContractor {
    return {
        contractorType: 'IndividualEntityContractor',
        individualEntity: {
            individualEntityType: 'RussianIndividualEntity',
            name: name.shortName,
            inn
        }
    };
}
