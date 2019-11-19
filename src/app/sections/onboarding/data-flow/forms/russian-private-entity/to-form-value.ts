import get from 'lodash.get';

import { QuestionaryData } from '../../../../../api-codegen/questionary';
import { FormValue } from '../form-value';

export const toFormValue = (d: QuestionaryData): FormValue => {
    const russianIndividualEntity = get(d, ['contractor', 'individualEntity', 'russianIndividualEntity'], {});
    const russianPrivateEntity = get(russianIndividualEntity, ['russianPrivateEntity'], {});
    const russianDomesticPassport = get(russianIndividualEntity, ['identityDocument', 'russianDomesticPassport'], {});
    const individualResidencyInfo = get(russianIndividualEntity, ['residencyInfo', 'individualResidencyInfo'], {});

    return {
        russianPrivateEntity: {
            ...russianPrivateEntity,
            snils: russianIndividualEntity.snils
        },
        pdlInfo: {
            pdlCategory: russianIndividualEntity.pdlCategory,
            pdlRelationDegree: russianIndividualEntity.pdlRelationDegree
        },
        russianDomesticPassport,
        individualResidencyInfo
    };
};
