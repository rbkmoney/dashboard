import moment from 'moment';
import { Overwrite } from 'utility-types';

import { Head, ReqContractor, ReqLegalEntity, ReqResponse } from '@dsh/api-codegen/aggr-proxy';
import {
    LegalEntityContractor,
    LegalOwnerInfo,
    LegalRegistrationInfo,
    RussianLegalEntity,
} from '@dsh/api-codegen/questionary';

import { getAddress } from './get-address';

export type ReqResponseLegalEntity = Overwrite<ReqResponse, { contractor: ReqLegalEntity }>;
type RussianLegalEntityContractor = Overwrite<
    LegalEntityContractor,
    { legalEntity: Overwrite<RussianLegalEntity, { registrationInfo: LegalRegistrationInfo }> }
>;

export function isReqLegalEntity(contractor: ReqContractor): contractor is ReqLegalEntity {
    return contractor.reqContractorType === 'ReqLegalEntity';
}

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
