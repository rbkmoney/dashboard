import get from 'lodash.get';

import {
    AccountantInfo,
    AdditionalInfo,
    Contractor,
    IndividualEntityContractor,
    LegalEntityContractor,
    LegalResidencyInfo,
    QuestionaryData,
    RussianIndividualEntity,
    RussianLegalEntity,
    WithoutChiefAccountingOrganization
} from '../../../../../api-codegen/questionary';
import { FormValue } from '../form-value';

const applyToWithoutAccountant = (
    accountantInfoType: AccountantInfo.AccountantInfoTypeEnum,
    accountantOrgInn: string
) => {
    const result = {
        accountantInfoType
    };
    if (accountantInfoType === 'WithoutChiefAccountingOrganization') {
        return {
            ...result,
            inn: accountantOrgInn
        } as WithoutChiefAccountingOrganization;
    }
    return result;
};

const applyToAccountantInfo = (
    withoutAccountant: boolean,
    accountantType: AccountantInfo.AccountantInfoTypeEnum,
    accountantOrgInn: string
): AccountantInfo =>
    withoutAccountant
        ? applyToWithoutAccountant(accountantType, accountantOrgInn)
        : {
              accountantInfoType: 'WithChiefAccountant'
          };

const applyToAdditionalInfo = (
    i: AdditionalInfo,
    {
        staffCount,
        withoutAccountant,
        accountantType,
        accountantOrgInn,
        hasBeneficiary,
        hasLiquidationProcess
    }: FormValue
): AdditionalInfo => ({
    ...i,
    staffCount,
    benefitThirdParties: false,
    hasBeneficiary,
    hasLiquidationProcess,
    accountantInfo: applyToAccountantInfo(withoutAccountant, accountantType, accountantOrgInn)
});

const applyToResidencyInfo = (
    i: LegalResidencyInfo,
    { residencyInfo: { taxResident, fatca } }: FormValue
): LegalResidencyInfo => ({
    ...i,
    residencyInfoType: 'LegalResidencyInfo',
    taxResident,
    fatca
});

const applyToLegalEntityContractor = (t: LegalEntityContractor, v: FormValue): LegalEntityContractor => {
    const legalEntity = get(t, ['legalEntity']);
    return {
        ...t,
        legalEntity: {
            ...legalEntity,
            additionalInfo: applyToAdditionalInfo(get(legalEntity, ['additionalInfo']), v),
            residencyInfo: applyToResidencyInfo(get(legalEntity, ['residencyInfo']), v)
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
