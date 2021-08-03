import moment from 'moment';

import { Head, ReqLegalEntity, ReqResponse } from '@dsh/api-codegen/aggr-proxy';
import {
    LegalEntityContractor,
    LegalOwnerInfo,
    LegalRegistrationInfo,
    RussianLegalEntity,
} from '@dsh/api-codegen/questionary';

import { Replace } from '../../../../../../../type-utils';
import { getAddress } from './get-address';

type ReqResponseLegalEntity = Replace<ReqResponse, { contractor: ReqLegalEntity }>;
type RussianLegalEntityContractor = Replace<
    LegalEntityContractor,
    { legalEntity: Replace<RussianLegalEntity, { registrationInfo: LegalRegistrationInfo }> }
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
            fio: head.fio,
        },
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
                registrationDate: moment(contractor.registrationDate).utc().format(),
                registrationAddress: getAddress(contractor.legalAddress.addressRf),
            },
            okatoCode: contractor.okato,
            okpoCode: contractor.okpo,
            ...(legalOwnerInfo ? { legalOwnerInfo } : {}),
        },
    };
}
