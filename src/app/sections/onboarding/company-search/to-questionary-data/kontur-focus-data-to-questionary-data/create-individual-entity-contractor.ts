import moment from 'moment';

import { ReqIndividualEntity, ReqResponse } from '@dsh/api-codegen/aggr-proxy';
import {
    IndividualEntityContractor,
    IndividualRegistrationInfo,
    RussianIndividualEntity,
} from '@dsh/api-codegen/questionary';

import { Replace } from '../../../../../../type-utils';

type ReqResponseIndividualEntity = Replace<ReqResponse, { contractor: ReqIndividualEntity }>;
type RussianIndividualEntityContractor = Replace<
    IndividualEntityContractor,
    { individualEntity: Replace<RussianIndividualEntity, { registrationInfo: IndividualRegistrationInfo }> }
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
