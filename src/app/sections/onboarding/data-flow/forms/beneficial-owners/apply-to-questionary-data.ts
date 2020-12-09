import get from 'lodash.get';

import {
    BeneficialOwner,
    Contractor,
    IndividualEntityContractor,
    IndividualResidencyInfo,
    LegalEntityContractor,
    QuestionaryData,
    RussianIndividualEntity,
    RussianLegalEntity,
} from '@dsh/api-codegen/questionary';

import { FormValue } from '../form-value';

const applyToBeneficialOwners = (beneficialOwners: FormValue[]): BeneficialOwner[] => {
    if (beneficialOwners.length === 0) {
        return [];
    }
    return beneficialOwners.map(
        ({
            ownershipPercentage,
            pdlInfo: { pdlCategory, pdlRelationDegree },
            privateEntityInfo: { birthDate, birthPlace, residenceAddress, snils, innfl, fio },
            russianDomesticPassport: { seriesNumber, issuer, issuerCode, issuedAt },
            individualResidencyInfo: { usaTaxResident, exceptUsaTaxResident },
        }) => ({
            ownershipPercentage,
            pdlCategory,
            pdlRelationDegree,
            russianPrivateEntity: {
                birthDate,
                birthPlace,
                residenceAddress,
                fio,
            },
            snils,
            inn: innfl,
            identityDocument: {
                identityDocumentType: 'RussianDomesticPassport',
                issuer,
                issuerCode,
                issuedAt,
                seriesNumber,
            },
            residencyInfo: {
                residencyInfoType: 'IndividualResidencyInfo',
                usaTaxResident,
                exceptUsaTaxResident,
            } as IndividualResidencyInfo,
        })
    );
};

const applyToLegalEntityContractor = (
    t: LegalEntityContractor,
    { noOwners, beneficialOwners }: FormValue
): LegalEntityContractor => {
    const legalEntity = get(t, ['legalEntity']);
    return {
        ...t,
        legalEntity: {
            ...legalEntity,
            hasBeneficialOwners: !noOwners,
            beneficialOwner: applyToBeneficialOwners(beneficialOwners),
        } as RussianLegalEntity,
    };
};

const applyToIndividualEntityContractor = (
    t: IndividualEntityContractor,
    { noOwners, beneficialOwners }: FormValue
): IndividualEntityContractor => {
    const individualEntity = get(t, ['individualEntity']);
    return {
        ...t,
        individualEntity: {
            ...individualEntity,
            hasBeneficialOwners: !noOwners,
            beneficialOwners: applyToBeneficialOwners(beneficialOwners),
        } as RussianIndividualEntity,
    };
};

const applyToContractor = (t: Contractor, v: FormValue): Contractor => {
    switch (t.contractorType) {
        case 'LegalEntityContractor':
            return applyToLegalEntityContractor(t, v);
        case 'IndividualEntityContractor':
            return applyToIndividualEntityContractor(t, v);
    }
};

export const applyToQuestionaryData = (d: QuestionaryData, v: FormValue): QuestionaryData => ({
    ...d,
    contractor: applyToContractor(d.contractor, v),
});
