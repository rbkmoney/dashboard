import get from 'lodash.get';

import {
    QuestionaryData,
    IdentityDocument,
    LegalOwnerInfo,
    AuthorityConfirmingDocument,
    RussianPrivateEntity
} from '../../../../../api-codegen/questionary';
import { FormValue } from '../form-value';

const toPrivateEntityInfo = (e: RussianPrivateEntity, i: LegalOwnerInfo): FormValue => ({
    birthDate: get(e, ['birthDate'], null),
    birthPlace: get(e, ['birthPlace'], null),
    residenceAddress: get(e, ['residenceAddress'], null),
    snils: get(i, ['snils'], null),
    innfl: get(i, ['inn'], null)
});

const toAuthorityConfirmingDocument = (d: AuthorityConfirmingDocument): FormValue => ({
    type: get(d, ['type'], null),
    date: get(d, ['date'], null),
    number: get(d, ['number'], null)
});

const toPdlInfoFormValue = (i: LegalOwnerInfo): FormValue => ({
    pdlCategory: get(i, ['pdlCategory'], false),
    pdlRelationDegree: get(i, ['pdlRelationDegree'], null)
});

const toDomesticPassportFormValue = (d: IdentityDocument): FormValue => ({
    seriesNumber: get(d, ['seriesNumber'], null),
    issuer: get(d, ['issuer'], null),
    issuerCode: get(d, ['issuerCode'], null),
    issuedAt: get(d, ['issuedAt'], null)
});

export const toFormValue = (d: QuestionaryData): FormValue => {
    const legalOwnerInfo = get(d, ['contractor', 'legalEntity', 'legalOwnerInfo']);
    const russianPrivateEntity = get(legalOwnerInfo, ['russianPrivateEntity']);
    return {
        privateEntityInfo: toPrivateEntityInfo(russianPrivateEntity, legalOwnerInfo),
        headPosition: get(legalOwnerInfo, ['headPosition'], null),
        termOfOffice: get(legalOwnerInfo, ['termOfOffice'], null),
        russianDomesticPassport: toDomesticPassportFormValue(get(legalOwnerInfo, ['identityDocument'])),
        pdlInfo: toPdlInfoFormValue(legalOwnerInfo),
        authorityConfirmingDocument: toAuthorityConfirmingDocument(get(legalOwnerInfo, ['authorityConfirmingDocument']))
    };
};
