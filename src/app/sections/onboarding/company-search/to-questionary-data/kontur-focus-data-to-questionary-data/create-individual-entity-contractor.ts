import moment from 'moment';

import { Replace } from '../../../../../../type-utils';
import { ReqIndividualEntity, ReqResponse } from '../../../../../api-codegen/aggr-proxy';
import {
    IndividualEntityContractor,
    IndividualRegistrationInfo,
    RussianIndividualEntity
} from '../../../../../api-codegen/questionary';

type ReqResponseIndividualEntity = Replace<ReqResponse, { contractor: ReqIndividualEntity }>;
type RussianIndividualEntityContractor = Replace<
    IndividualEntityContractor,
    { individualEntity: Replace<RussianIndividualEntity, { registrationInfo: IndividualRegistrationInfo }> }
>;

export function createIndividualEntityContractor({
    contractor,
    inn
}: ReqResponseIndividualEntity): RussianIndividualEntityContractor {
    return {
        contractorType: 'IndividualEntityContractor',
        individualEntity: {
            individualEntityType: 'RussianIndividualEntity',
            name: `ИП ${contractor.fio}`,
            inn,
            registrationInfo: {
                registrationInfoType: 'IndividualRegistrationInfo',
                registrationDate: moment(contractor.registrationDate)
                    .utc()
                    .format()
            },
            russianPrivateEntity: {
                fio: contractor.fio
            }
        }
    };
}
