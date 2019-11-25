import get from 'lodash.get';

import {
    QuestionaryData,
    LegalEntityContractor,
    RussianLegalEntity,
    BeneficialOwner,
    IndividualEntityContractor,
    RussianIndividualEntity,
    IndividualResidencyInfo
} from '../../../../../api-codegen/questionary';
import { FormValue } from '../form-value';

const applyToBeneficialOwners = (beneficialOwners: FormValue[]): BeneficialOwner[] => {
    if (beneficialOwners.length === 0) {
        return [];
    }
    return beneficialOwners.map(
        ({
            ownershipPercentage,
            pdlInfo: { pdlCategory, pdlRelationDegree },
            privateEntityInfo: { birthDate, birthPlace, residenceAddress, snils, innfl },
            russianDomesticPassport: { seriesNumber, issuer, issuerCode, issuedAt },
            individualResidencyInfo: { usaTaxResident, exceptUsaTaxResident }
        }) => {
            console.warn('Questionary field is missing: RussianDomesticPassport.seriesNumber', seriesNumber);
            return {
                ownershipPercentage,
                pdlCategory,
                pdlRelationDegree,
                russianPrivateEntity: {
                    birthDate,
                    birthPlace,
                    residenceAddress
                },
                snils,
                inn: innfl,
                identityDocument: {
                    identityDocumentType: 'RussianDomesticPassport',
                    issuer,
                    issuerCode,
                    issuedAt
                },
                residencyInfo: {
                    residencyInfoType: 'IndividualResidencyInfo',
                    usaTaxResident,
                    exceptUsaTaxResident
                } as IndividualResidencyInfo
            };
        }
    );
};

const applyToLegalEntityContractor = (
    t: LegalEntityContractor,
    { beneficialOwners }: FormValue
): LegalEntityContractor => {
    const legalEntity = get(t, ['legalEntity']);
    return {
        ...t,
        legalEntity: {
            ...legalEntity,
            beneficialOwner: applyToBeneficialOwners(beneficialOwners)
        } as RussianLegalEntity
    };
};

const applyToIndividualEntityContractor = (
    t: IndividualEntityContractor,
    { beneficialOwners }: FormValue
): IndividualEntityContractor => {
    const individualEntity = get(t, ['individualEntity']);
    return {
        ...t,
        individualEntity: {
            ...individualEntity,
            beneficialOwners: applyToBeneficialOwners(beneficialOwners)
        } as RussianIndividualEntity
    };
};

const applyToContractor = (t: LegalEntityContractor, v: FormValue): LegalEntityContractor => {
    switch (t.contractorType) {
        case 'LegalEntityContractor':
            return applyToLegalEntityContractor(t, v);
        case 'IndividualEntityContractor':
            return applyToIndividualEntityContractor(t, v);
    }
};

export const applyToQuestionaryData = (d: QuestionaryData, v: FormValue): QuestionaryData => ({
    ...d,
    contractor: applyToContractor(d.contractor, v)
});
