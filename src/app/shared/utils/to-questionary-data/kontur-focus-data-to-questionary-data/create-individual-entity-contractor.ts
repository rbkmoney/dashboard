import moment from 'moment';
import { Overwrite } from 'utility-types';

import { ReqIndividualEntity, ReqResponse } from '@dsh/api-codegen/aggr-proxy';
import {
    IndividualEntityContractor,
    IndividualRegistrationInfo,
    RussianIndividualEntity,
} from '@dsh/api-codegen/questionary';

type ReqResponseIndividualEntity = Overwrite<ReqResponse, { contractor: ReqIndividualEntity }>;
type RussianIndividualEntityContractor = Overwrite<
    IndividualEntityContractor,
    { individualEntity: Overwrite<RussianIndividualEntity, { registrationInfo: IndividualRegistrationInfo }> }
>;

export function createIndividualEntityContractor({
    contractor,
    inn,
}: ReqResponseIndividualEntity): RussianIndividualEntityContractor {
    return {
        contractorType: 'IndividualEntityContractor',
        individualEntity: {
            individualEntityType: 'RussianIndividualEntity',
            name: `ИП ${contractor.fio}`,
            inn,
            registrationInfo: {
                registrationInfoType: 'IndividualRegistrationInfo',
                registrationDate: moment(contractor.registrationDate).utc().format(),
            },
            russianPrivateEntity: {
                fio: contractor.fio,
            },
        },
    };
}
