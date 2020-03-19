import get from 'lodash.get';

import { LegalOwnerInfo, RussianIndividualEntity } from '../../../../../../api-codegen/questionary';
import { FormValue } from '../../form-value';

export const toPrivateEntityInfo = (i: RussianIndividualEntity | LegalOwnerInfo): FormValue => {
    const e = get(i, ['russianPrivateEntity']);
    return {
        birthDate: get(e, ['birthDate'], null),
        birthPlace: get(e, ['birthPlace'], null),
        residenceAddress: get(e, ['residenceAddress'], null),
        fio: get(e, ['fio'], null),
        snils: get(i, ['snils'], null),
        innfl: get(i, ['inn'], null)
    };
};
