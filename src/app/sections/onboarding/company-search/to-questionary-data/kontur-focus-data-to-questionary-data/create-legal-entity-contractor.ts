import moment from 'moment';
import { Overwrite } from 'utility-types';

import { ReqResponse, Head, ReqLegalEntity } from '../../../../../api-codegen/aggr-proxy';
import { getAddress } from './get-address';
import {
    LegalOwnerInfo,
    RussianLegalEntity,
    LegalRegistrationInfo,
    LegalEntityContractor
} from '../../../../../api-codegen/questionary';

type ReqResponseLegalEntity = Overwrite<ReqResponse, { contractor: ReqLegalEntity }>;
type RussianLegalEntityContractor = Overwrite<
    LegalEntityContractor,
    { legalEntity: Overwrite<RussianLegalEntity, { registrationInfo: LegalRegistrationInfo }> }
>;

function getLegalOwnerInfo(heads: Head[]): LegalOwnerInfo {
    if (!Array.isArray(heads) || heads.length !== 1) {
        return null;
    }
    const [head] = heads;
    return {
        inn: head.innfl,
        headPosition: head.position,
        russianPrivateEntity: {
            fio: head.fio
        }
    };
}

export function createLegalEntityContractor({ contractor, inn }: ReqResponseLegalEntity): RussianLegalEntityContractor {
    const legalOwnerInfo = getLegalOwnerInfo(contractor.heads);
    return {
        contractorType: 'LegalEntityContractor',
        legalEntity: {
            legalEntityType: 'RussianLegalEntity',
            name: contractor.legalName.shortName,
            inn,
            registrationInfo: {
                registrationInfoType: 'LegalRegistrationInfo',
                registrationDate: moment(contractor.registrationDate)
                    .utc()
                    .format(),
                registrationAddress: getAddress(contractor.legalAddress.addressRf)
            },
            okatoCode: contractor.okato,
            okpoCode: contractor.okpo,
            ...(legalOwnerInfo ? { legalOwnerInfo } : {})
        }
    };
}
