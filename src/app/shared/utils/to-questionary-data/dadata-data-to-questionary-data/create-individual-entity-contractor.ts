import { Overwrite } from 'utility-types';

import { OrgType, PartyContent } from '@dsh/api-codegen/aggr-proxy';
import {
    IndividualEntityContractor,
    IndividualRegistrationInfo,
    RussianIndividualEntity,
} from '@dsh/api-codegen/questionary';

type RussianIndividualEntityContractor = Overwrite<
    IndividualEntityContractor,
    { individualEntity: Overwrite<RussianIndividualEntity, { registrationInfo?: IndividualRegistrationInfo }> }
>;

export function isIndividualOrg(content: PartyContent): content is PartyContent {
    return content.orgType === OrgType.Individual;
}

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
