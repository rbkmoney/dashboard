import get from 'lodash.get';

import {
    AdditionalInfo,
    BankAccount,
    Contractor,
    IndividualEntityContractor,
    LegalEntityContractor,
    QuestionaryData,
    RussianBankAccount,
    RussianIndividualEntity,
    RussianLegalEntity,
} from '../../../../../api-codegen/questionary';
import { FormValue } from '../form-value';

const applyToAdditionalInfo = (
    i: AdditionalInfo,
    { monthOperationCount, monthOperationSum }: FormValue
): AdditionalInfo => ({
    ...i,
    monthOperationCount,
    monthOperationSum,
});

const applyToLegalEntityContractor = (t: LegalEntityContractor, v: FormValue): LegalEntityContractor => {
    const legalEntity = get(t, ['legalEntity']);
    return {
        ...t,
        legalEntity: {
            ...legalEntity,
            additionalInfo: applyToAdditionalInfo(get(legalEntity, ['additionalInfo']), v),
        } as RussianLegalEntity,
    };
};

const applyToIndividualEntityContractor = (t: IndividualEntityContractor, v: FormValue): IndividualEntityContractor => {
    const individualEntity = get(t, ['individualEntity']);
    return {
        ...t,
        individualEntity: {
            ...individualEntity,
            additionalInfo: applyToAdditionalInfo(get(individualEntity, ['additionalInfo']), v),
        } as RussianIndividualEntity,
    };
};

const applyToContractor = (t: Contractor, v: FormValue): LegalEntityContractor => {
    switch (t.contractorType) {
        case 'LegalEntityContractor':
            return applyToLegalEntityContractor(t, v);
        case 'IndividualEntityContractor':
            return applyToIndividualEntityContractor(t, v);
    }
};

const applyToBankAccount = (b: BankAccount, { account, bankName, bankPostAccount, bankBik }: FormValue): BankAccount =>
    ({
        ...b,
        bankAccountType: 'RussianBankAccount',
        account,
        bankName,
        bankPostAccount,
        bankBik,
    } as RussianBankAccount);

export const applyToQuestionaryData = (d: QuestionaryData, v: FormValue): QuestionaryData => ({
    ...d,
    contractor: applyToContractor(d.contractor, v),
    bankAccount: applyToBankAccount(d.bankAccount, get(v, ['bankAccount'])),
});
