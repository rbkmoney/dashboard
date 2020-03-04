import { Overwrite } from 'utility-types';

import { PartyContent } from '../../../../../api-codegen/aggr-proxy';
import {
    IndividualEntityContractor,
    RussianIndividualEntity,
    IndividualRegistrationInfo
} from '../../../../../api-codegen/questionary';

type RussianIndividualEntityContractor = Overwrite<
    IndividualEntityContractor,
    { individualEntity: Overwrite<RussianIndividualEntity, { registrationInfo?: IndividualRegistrationInfo }> }
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
