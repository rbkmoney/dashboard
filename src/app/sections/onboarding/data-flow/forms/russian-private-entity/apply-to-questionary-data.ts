import get from 'lodash.get';

import { QuestionaryData, IndividualEntityContractor } from '../../../../../api-codegen/questionary/swagger-codegen';
import { FormValue } from '../form-value';

const applyToContractor = (
    t: IndividualEntityContractor,
    {
        russianPrivateEntity: { fio, birthDate, birthPlace, residenceAddress, snils },
        russianDomesticPassport,
        // pdlInfo: { pdlCategory, pdlRelationDegree },
        individualResidencyInfo
    }: FormValue
): IndividualEntityContractor => {
    const individualEntity = get(t, ['individualEntity']);
    const russianIndividualEntity = get(individualEntity, ['russianIndividualEntity']);
    const russianPrivateEntity = get(russianIndividualEntity, ['russianPrivateEntity']);
    const identityDocument = get(russianIndividualEntity, ['identityDocument']);
    const residencyInfo = get(russianIndividualEntity, ['residencyInfo']);
    return {
        ...t,
        individualEntity: {
            ...individualEntity,
            russianIndividualEntity: {
                ...russianIndividualEntity,
                snils,
                russianPrivateEntity: {
                    ...russianPrivateEntity,
                    fio,
                    birthDate,
                    birthPlace,
                    residenceAddress
                },
                identityDocument: {
                    ...identityDocument,
                    russianDomesticPassport
                },
                residencyInfo: {
                    ...residencyInfo,
                    individualResidencyInfo
                }
            }
        }
    };
};

export const applyToQuestionaryData = (d: QuestionaryData, v: FormValue): QuestionaryData => ({
    ...d,
    contractor: applyToContractor(d.contractor, v)
});
