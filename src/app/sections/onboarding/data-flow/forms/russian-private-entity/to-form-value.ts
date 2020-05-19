import get from 'lodash.get';

import { QuestionaryData } from '../../../../../api-codegen/questionary';
import { FormValue } from '../form-value';
import { toPdlInfo, toPrivateEntityInfo, toResidencyInfo, toRussianDomesticPassport } from '../subforms';

export const toFormValue = (d: QuestionaryData): FormValue => {
    const e = get(d, ['contractor', 'individualEntity']);
    return {
        privateEntityInfo: toPrivateEntityInfo(e),
        russianDomesticPassport: toRussianDomesticPassport(get(e, ['identityDocument'])),
        individualResidencyInfo: toResidencyInfo(get(e, ['residencyInfo'])),
        pdlInfo: toPdlInfo(e),
    };
};
