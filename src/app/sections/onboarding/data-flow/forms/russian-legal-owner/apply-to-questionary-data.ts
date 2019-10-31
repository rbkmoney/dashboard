import get from 'lodash.get';

import {
    QuestionaryData,
    LegalEntityContractor,
    LegalOwnerInfo,
    RussianLegalEntity,
    IdentityDocument,
    RussianDomesticPassport
} from '../../../../../api-codegen/questionary';
import { FormValue } from '../form-value';

const applyToIdentityDocument = (
    identityDocument: IdentityDocument,
    { seriesNumber, issuer, issuerCode, issuedAt }: FormValue
): RussianDomesticPassport => {
    console.warn('Questionary field is missing: RussianDomesticPassport.seriesNumber', seriesNumber);
    return {
        ...identityDocument,
        identityDocumentType: IdentityDocument.IdentityDocumentTypeEnum.RussianDomesticPassport,
        issuer,
        issuerCode,
        issuedAt
    };
};

const applyToContractor = (
    t: LegalEntityContractor,
    {
        birthDate,
        birthPlace,
        residenceAddress,
        snils,
        innfl,
        headPosition,
        russianDomesticPassport,
        pdlInfo: { pdlCategory, pdlRelationDegree },
        termOfOffice
    }: FormValue
): LegalEntityContractor => {
    const legalEntity = get(t, ['legalEntity']);
    const legalOwnerInfo = get(t, ['legalEntity', 'legalOwnerInfo']);
    const russianPrivateEntity = get(legalOwnerInfo, ['russianPrivateEntity']);
    const identityDocument = get(legalOwnerInfo, ['identityDocument']);
    console.warn('Questionary field is missing: LegalOwnerInfo.headPosition', headPosition);
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
                    residenceAddress
                },
                inn: innfl,
                identityDocument: applyToIdentityDocument(identityDocument, russianDomesticPassport),
                termOfOffice
            } as LegalOwnerInfo
        } as RussianLegalEntity
    };
};

export const applyToQuestionaryData = (d: QuestionaryData, v: FormValue): QuestionaryData => ({
    ...d,
    contractor: applyToContractor(d.contractor, v)
});
