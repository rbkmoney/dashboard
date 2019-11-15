import get from 'lodash.get';

import { QuestionaryData } from '../../../../../api-codegen/questionary';
import { FormValue } from '../form-value';

export const toFormValue = (d: QuestionaryData): FormValue => {
    const additionalInfo = get(d, ['contractor', 'legalEntity', 'additionalInfo']);
    const accountantInfo = get(additionalInfo, ['accountantInfo']);
    return {
        staffCount: get(additionalInfo, ['staffCount'], null),
        withoutAccountant: get(accountantInfo, ['accountantInfoType']) === 'WithoutChiefAccountant',
        accountantType: get(accountantInfo, ['withoutChiefAccountantType'], null),
        hasBeneficiaryParty: false, // TODO need backend implementation
        hasLiquidationProcess: false // TODO need backend implementation
    };
};
