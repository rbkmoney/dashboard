import get from 'lodash.get';

import {
    QuestionaryData,
    LegalEntityContractor,
    BankAccount,
    RussianBankAccount,
    RussianLegalEntity
} from '../../../../../api-codegen/questionary';
import { FormValue } from '../form-value';

const applyToContractor = (
    t: LegalEntityContractor,
    { monthOperationCount, monthOperationSum }: FormValue
): LegalEntityContractor => {
    const legalEntity = get(t, ['legalEntity']);
    const additionalInfo = get(t, ['legalEntity', 'additionalInfo']);
    return {
        ...t,
        legalEntity: {
            ...legalEntity,
            additionalInfo: {
                ...additionalInfo,
                monthOperationCount,
                monthOperationSum
            }
        } as RussianLegalEntity
    };
};

const applyToBankAccount = (
    b: BankAccount,
    { account, bankName, bankPostAccount, bankBik }: FormValue
): BankAccount => {
    return {
        ...b,
        bankAccountType: 'RussianBankAccount',
        account,
        bankName,
        bankPostAccount,
        bankBik
    } as RussianBankAccount;
};

export const applyToQuestionaryData = (d: QuestionaryData, v: FormValue): QuestionaryData => ({
    ...d,
    contractor: applyToContractor(d.contractor, v),
    bankAccount: applyToBankAccount(d.bankAccount, get(v, ['bankAccount']))
});
