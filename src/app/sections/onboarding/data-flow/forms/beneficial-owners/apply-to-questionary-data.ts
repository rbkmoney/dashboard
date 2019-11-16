import get from 'lodash.get';

import {
    QuestionaryData,
    LegalEntityContractor,
    RussianLegalEntity,
    BeneficialOwner
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
            usaTaxResident,
            exceptUsaTaxResident
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
                    residencyInfoType: 'LegalResidencyInfo',
                    taxResident: usaTaxResident,
                    ownerResident: exceptUsaTaxResident,
                    fatca: false
                }
            };
        }
    );
};

const applyToContractor = (t: LegalEntityContractor, { beneficialOwners }: FormValue): LegalEntityContractor => {
    const legalEntity = get(t, ['legalEntity']);
    return {
        ...t,
        legalEntity: {
            ...legalEntity,
            beneficialOwner: applyToBeneficialOwners(beneficialOwners)
        } as RussianLegalEntity
    };
};

export const applyToQuestionaryData = (d: QuestionaryData, v: FormValue): QuestionaryData => ({
    ...d,
    contractor: applyToContractor(d.contractor, v)
});
