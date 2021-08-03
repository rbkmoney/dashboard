import { PartyContent } from '@dsh/api-codegen/aggr-proxy';
import {
    IndividualEntityContractor,
    IndividualRegistrationInfo,
    RussianIndividualEntity,
} from '@dsh/api-codegen/questionary';

import { Replace } from '../../../../../../../type-utils';

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
            inn,
        },
    };
}
