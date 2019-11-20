import get from 'lodash.get';

import { QuestionaryData, RussianPrivateEntity, RussianIndividualEntity } from '../../../../../api-codegen/questionary';
import { FormValue } from '../form-value';
import { toRussianDomesticPassport, toResidencyInfo } from '../subforms';

const toPrivateEntityInfo = (e: RussianPrivateEntity, i: RussianIndividualEntity): FormValue => ({
    birthDate: get(e, ['birthDate'], null),
    birthPlace: get(e, ['birthPlace'], null),
    residenceAddress: get(e, ['residenceAddress'], null),
    snils: get(i, ['snils'], null)
});

export const toFormValue = (d: QuestionaryData): FormValue => {
    const individualEntity = get(d, ['contractor', 'individualEntity']);
    const russianPrivateEntity = get(individualEntity, ['russianPrivateEntity']);
    return {
        privateEntityInfo: toPrivateEntityInfo(russianPrivateEntity, individualEntity),
        russianDomesticPassport: toRussianDomesticPassport(get(individualEntity, ['identityDocument'])),
        individualResidencyInfo: toResidencyInfo(get(individualEntity, ['residencyInfo']))
    };
};
