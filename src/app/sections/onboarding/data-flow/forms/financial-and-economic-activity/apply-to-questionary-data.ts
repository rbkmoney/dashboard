import get from 'lodash.get';

import {
    QuestionaryData,
    RussianLegalEntity,
    LegalEntityContractor,
    AccountantInfo,
    WithoutChiefAccountant,
    AccountingOrganization,
    IndividualEntityContractor,
    RussianIndividualEntity,
    AdditionalInfo,
    Contractor
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

const applyToAdditionalInfo = (
    i: AdditionalInfo,
    { staffCount, withoutAccountant, accountantType, accountantOrgInn }: FormValue
): AdditionalInfo => ({
    ...i,
    staffCount,
    benefitThirdParties: false,
    accountantInfo: applyToAccountantInfo(
        get(i, ['accountantInfo']),
        withoutAccountant,
        accountantType,
        accountantOrgInn
    )
});

const applyToLegalEntityContractor = (t: LegalEntityContractor, v: FormValue): LegalEntityContractor => {
    const legalEntity = get(t, ['legalEntity']);
    return {
        ...t,
        legalEntity: {
            ...legalEntity,
            additionalInfo: applyToAdditionalInfo(get(legalEntity, ['additionalInfo']), v)
        } as RussianLegalEntity
    };
};

const applyToIndividualEntityContractor = (t: IndividualEntityContractor, v: FormValue): IndividualEntityContractor => {
    const individualEntity = get(t, ['individualEntity']);
    return {
        ...t,
        individualEntity: {
            ...individualEntity,
            additionalInfo: applyToAdditionalInfo(get(individualEntity, ['additionalInfo']), v)
        } as RussianIndividualEntity
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

export const applyToQuestionaryData = (d: QuestionaryData, v: FormValue): QuestionaryData => ({
    ...d,
    contractor: applyToContractor(d.contractor, v)
});
