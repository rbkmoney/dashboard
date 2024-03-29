import get from 'lodash-es/get';

import {
    AuthorityConfirmingDocument,
    LegalEntityContractor,
    LegalOwnerInfo,
    QuestionaryData,
    RussianLegalEntity,
} from '@dsh/api-codegen/questionary';

import { FormValue } from '../form-value';
import { applyToIdentityDocument } from '../subforms';

const applyToAuthorityConfirmingDocument = (
    authorityConfirmingDocument: AuthorityConfirmingDocument,
    { type, customType, date, number }: FormValue
): AuthorityConfirmingDocument => ({
    ...authorityConfirmingDocument,
    type: customType || type,
    number,
    date,
});

const applyToContractor = (
    t: LegalEntityContractor,
    {
        privateEntityInfo: { birthDate, birthPlace, residenceAddress, snils, innfl, fio },
        headPosition,
        termOfOffice,
        russianDomesticPassport,
        pdlInfo: { pdlCategory, pdlRelationDegree },
        authorityConfirmingDocument,
    }: FormValue
): LegalEntityContractor => {
    const legalEntity = get(t, ['legalEntity']);
    const legalOwnerInfo = get(t, ['legalEntity', 'legalOwnerInfo']);
    const russianPrivateEntity = get(legalOwnerInfo, ['russianPrivateEntity']);
    return {
        ...t,
        legalEntity: {
            ...legalEntity,
            legalOwnerInfo: {
                ...legalOwnerInfo,
                snils,
                pdlCategory,
                pdlRelationDegree,
                russianPrivateEntity: {
                    ...russianPrivateEntity,
                    birthDate,
                    birthPlace,
                    residenceAddress,
                    fio,
                },
                inn: innfl,
                identityDocument: applyToIdentityDocument(
                    get(legalOwnerInfo, ['identityDocument']),
                    russianDomesticPassport
                ),
                termOfOffice,
                authorityConfirmingDocument: applyToAuthorityConfirmingDocument(
                    get(legalOwnerInfo, ['authorityConfirmingDocument']),
                    authorityConfirmingDocument
                ),
                headPosition,
            } as LegalOwnerInfo,
        } as RussianLegalEntity,
    };
};

export const applyToQuestionaryData = (d: QuestionaryData, v: FormValue): QuestionaryData => ({
    ...d,
    contractor: applyToContractor(d.contractor, v),
});
