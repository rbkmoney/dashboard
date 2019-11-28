import get from 'lodash.get';

import {
    QuestionaryData,
    IndividualEntityContractor,
    RussianIndividualEntity,
    IndividualResidencyInfo,
    RussianPrivateEntity
} from '../../../../../api-codegen/questionary/swagger-codegen';
import { FormValue } from '../form-value';
import { applyToIdentityDocument } from '../subforms';

const applyToContractor = (
    t: IndividualEntityContractor,
    {
        privateEntityInfo: { fio, birthDate, birthPlace, residenceAddress, snils },
        russianDomesticPassport,
        pdlInfo: { pdlCategory, pdlRelationDegree },
        individualResidencyInfo: { usaTaxResident, exceptUsaTaxResident }
    }: FormValue
): IndividualEntityContractor => {
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
                residenceAddress,
                fio
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
            } as IndividualResidencyInfo,
            pdlCategory,
            pdlRelationDegree
        } as RussianIndividualEntity
    };
};

export const applyToQuestionaryData = (d: QuestionaryData, v: FormValue): QuestionaryData => ({
    ...d,
    contractor: applyToContractor(d.contractor, v)
});
