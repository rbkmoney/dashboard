import moment from 'moment';

import { Replace } from '../../../../../../type-utils';
import { ReqResponse, ReqIndividualEntity } from '../../../../../api-codegen/aggr-proxy';
import {
    IndividualEntityContractor,
    RussianIndividualEntity,
    IndividualRegistrationInfo
} from '../../../../../api-codegen/questionary';

type ReqResponseIndividualEntity = Replace<ReqResponse, { contractor: ReqIndividualEntity }>;
type RussianIndividualEntityContractor = Replace<
    IndividualEntityContractor,
    { individualEntity: Replace<RussianIndividualEntity, { registrationInfo: IndividualRegistrationInfo }> }
>;

export function createIndividualEntityContractor({
    contractor,
    inn,
    ogrn
}: ReqResponseIndividualEntity): RussianIndividualEntityContractor {
    return {
        contractorType: 'IndividualEntityContractor',
        individualEntity: {
            individualEntityType: 'RussianIndividualEntity',
            name: `ИП ${contractor.fio}`,
            inn,
            registrationInfo: {
                registrationInfoType: 'IndividualRegistrationInfo',
                ogrnip: ogrn,
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
