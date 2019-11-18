import get from 'lodash.get';

import { QuestionaryData } from '../../../../../api-codegen/questionary';
import { FormValue } from '../form-value';

export const toFormValue = (d: QuestionaryData): FormValue => {
    const additionalInfo = get(d, ['contractor', 'legalEntity', 'additionalInfo'], null);
    const bankAccount = get(d, ['bankAccount'], null);
    return {
        monthOperationCount: get(additionalInfo, ['monthOperationCount'], null),
        monthOperationSum: get(additionalInfo, ['monthOperationSum'], null),
        bankAccount: {
            account: get(bankAccount, ['account'], null),
            bankName: get(bankAccount, ['bankName'], null),
            bankPostAccount: get(bankAccount, ['bankPostAccount'], null),
            bankBik: get(bankAccount, ['bankBik'], null)
        }
    };
};
