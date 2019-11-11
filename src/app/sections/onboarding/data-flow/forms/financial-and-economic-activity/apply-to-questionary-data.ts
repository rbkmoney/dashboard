import get from 'lodash.get';

import {
    QuestionaryData,
    RussianLegalEntity,
    LegalEntityContractor,
    AccountantInfo,
    WithoutChiefAccountant,
    AccountingOrganization
} from '../../../../../api-codegen/questionary';
import { FormValue } from '../form-value';

const toAccountingOrganization = (i: WithoutChiefAccountant, accountantOrgInn: string): AccountingOrganization => ({
    ...i,
    inn: accountantOrgInn
});

const applyToWithoutChiefAccountant = (
    i: WithoutChiefAccountant,
    accountantType: string,
    accountantOrgInn: string
): WithoutChiefAccountant => {
    const result = {
        ...i,
        withoutChiefAccountantType: accountantType
    } as WithoutChiefAccountant;
    if (accountantType === 'AccountingOrganization') {
        return toAccountingOrganization(result, accountantOrgInn);
    }
    return result;
};

const applyToAccountantInfo = (
    i: AccountantInfo,
    withoutAccountant: boolean,
    accountantType: string,
    accountantOrgInn: string
): AccountantInfo => {
    const result = {
        ...i,
        accountantInfoType: withoutAccountant ? 'WithoutChiefAccountant' : 'WithChiefAccountant'
    } as AccountantInfo;
    if (withoutAccountant) {
        return applyToWithoutChiefAccountant(result as WithoutChiefAccountant, accountantType, accountantOrgInn);
    }
    return result;
};

const applyToContractor = (
    t: LegalEntityContractor,
    { staffCount, withoutAccountant, accountantType, accountantOrgInn }: FormValue
): LegalEntityContractor => {
    const legalEntity = get(t, ['legalEntity']);
    const additionalInfo = get(t, ['legalEntity', 'additionalInfo']);
    return {
        ...t,
        legalEntity: {
            ...legalEntity,
            additionalInfo: {
                ...additionalInfo,
                staffCount,
                benefitThirdParties: false,
                accountantInfo: applyToAccountantInfo(
                    get(additionalInfo, ['accountantInfo']),
                    withoutAccountant,
                    accountantType,
                    accountantOrgInn
                )
            }
        } as RussianLegalEntity
    };
};

export const applyToQuestionaryData = (d: QuestionaryData, v: FormValue): QuestionaryData => ({
    ...d,
    contractor: applyToContractor(d.contractor, v)
});
