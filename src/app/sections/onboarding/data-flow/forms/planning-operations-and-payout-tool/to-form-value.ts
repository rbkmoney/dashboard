import get from 'lodash.get';

import {
    BankAccount,
    Contractor,
    IndividualEntity,
    LegalEntity,
    QuestionaryData,
} from '../../../../../api-codegen/questionary';
import { FormValue } from '../form-value';

const fromBankAccount = (b: BankAccount) => ({
    account: get(b, ['account'], null),
    bankName: get(b, ['bankName'], null),
    bankPostAccount: get(b, ['bankPostAccount'], null),
    bankBik: get(b, ['bankBik'], null),
});

const fromEntity = (l: LegalEntity | IndividualEntity): FormValue => ({
    monthOperationCount: get(l, ['additionalInfo', 'monthOperationCount'], null),
    monthOperationSum: get(l, ['additionalInfo', 'monthOperationSum'], null),
});

const fromContractor = (c: Contractor): FormValue => {
    switch (get(c, ['contractorType'])) {
        case 'IndividualEntityContractor':
            return fromEntity(get(c, ['individualEntity']));
        case 'LegalEntityContractor':
            return fromEntity(get(c, ['legalEntity']));
    }
};

export const toFormValue = (d: QuestionaryData): FormValue => ({
    ...fromContractor(get(d, ['contractor'])),
    bankAccount: fromBankAccount(get(d, ['bankAccount'])),
});
