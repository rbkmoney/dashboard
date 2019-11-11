import get from 'lodash.get';

import {
    QuestionaryData,
    IdentityDocument,
    LegalOwnerInfo,
    AuthorityConfirmingDocument
} from '../../../../../api-codegen/questionary';
import { FormValue } from '../form-value';

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
        birthDate: get(russianPrivateEntity, ['birthDate'], null),
        birthPlace: get(russianPrivateEntity, ['birthPlace'], null),
        residenceAddress: get(russianPrivateEntity, ['residenceAddress'], null),
        snils: get(legalOwnerInfo, ['snils'], null),
        headPosition: get(legalOwnerInfo, ['headPosition'], null),
        innfl: get(legalOwnerInfo, ['inn'], null),
        russianDomesticPassport: toDomesticPassportFormValue(get(legalOwnerInfo, ['identityDocument'])),
        pdlInfo: toPdlInfoFormValue(legalOwnerInfo),
        termOfOffice: get(legalOwnerInfo, ['termOfOffice'], null),
        authorityConfirmingDocument: toAuthorityConfirmingDocument(get(legalOwnerInfo, ['authorityConfirmingDocument']))
    };
};
