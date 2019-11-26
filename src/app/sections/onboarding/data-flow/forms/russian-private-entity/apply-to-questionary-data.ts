import get from 'lodash.get';

import {
    QuestionaryData,
    IndividualEntityContractor,
    RussianIndividualEntity,
    IdentityDocument,
    IndividualResidencyInfo,
    RussianDomesticPassport
} from '../../../../../api-codegen/questionary/swagger-codegen';
import { FormValue } from '../form-value';
import { RussianPrivateEntity } from '../../../../../api-codegen/capi/swagger-codegen';

const applyToIdentityDocument = (
    identityDocument: IdentityDocument,
    { seriesNumber, issuer, issuerCode, issuedAt }: FormValue
): RussianDomesticPassport => {
    console.warn('Questionary field is missing: RussianDomesticPassport.seriesNumber', seriesNumber);
    return {
        ...identityDocument,
        identityDocumentType: 'RussianDomesticPassport',
        issuer,
        issuerCode,
        issuedAt
    };
};

const applyToContractor = (
    t: IndividualEntityContractor,
    {
        privateEntityInfo: { fio, birthDate, birthPlace, residenceAddress, snils },
        russianDomesticPassport,
        pdlInfo: { pdlCategory, pdlRelationDegree },
        individualResidencyInfo: { usaTaxResident, exceptUsaTaxResident }
    }: FormValue
): IndividualEntityContractor => {
    console.warn('Questionary field is missing: RussianIndividualEntity.pdlCategory', pdlCategory);
    console.warn('Questionary field is missing: RussianIndividualEntity.pdlRelationDegree', pdlRelationDegree);
    console.warn('Questionary field is missing: RussianPrivateEntity.fio', fio);
    const individualEntity = get(t, ['individualEntity']);
    const russianPrivateEntity = get(individualEntity, ['russianPrivateEntity']);
    const residencyInfo = get(individualEntity, ['residencyInfo']);
    return {
        ...t,
        contractorType: 'IndividualEntityContractor',
        individualEntity: {
            ...individualEntity,
            individualEntityType: 'RussianIndividualEntity',
            snils,
            russianPrivateEntity: {
                ...russianPrivateEntity,
                birthDate,
                birthPlace,
                residenceAddress
            } as RussianPrivateEntity,
            identityDocument: applyToIdentityDocument(
                get(individualEntity, ['identityDocument']),
                russianDomesticPassport
            ),
            residencyInfo: {
                ...residencyInfo,
                residencyInfoType: 'IndividualResidencyInfo',
                usaTaxResident,
                exceptUsaTaxResident
            } as IndividualResidencyInfo
        } as RussianIndividualEntity
    };
};

export const applyToQuestionaryData = (d: QuestionaryData, v: FormValue): QuestionaryData => ({
    ...d,
    contractor: applyToContractor(d.contractor, v)
});
