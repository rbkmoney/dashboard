import get from 'lodash-es/get';

import { Contractor, IndividualEntity, LegalEntity, QuestionaryData } from '@dsh/api-codegen/questionary';

import { FormValue } from '../form-value';

const fromEntity = (l: LegalEntity | IndividualEntity): FormValue => {
    const additionalInfo = get(l, ['additionalInfo']);
    const accountantInfo = get(additionalInfo, ['accountantInfo']);
    const accountantInfoType = get(accountantInfo, ['accountantInfoType'], 'WithChiefAccountant');
    return {
        staffCount: get(additionalInfo, ['staffCount'], null),
        hasBeneficiary: get(additionalInfo, ['hasBeneficiary'], false),
        hasLiquidationProcess: get(additionalInfo, ['hasLiquidationProcess'], false),
        withoutAccountant: accountantInfoType !== 'WithChiefAccountant',
        accountantType: accountantInfoType,
        accountantOrgInn: get(accountantInfo, ['inn'], null),
    };
};

const fromLegalEntity = (l: LegalEntity): FormValue => {
    const residencyInfo = get(l, ['residencyInfo']);
    return {
        ...fromEntity(l),
        residencyInfo: {
            taxResident: get(residencyInfo, ['taxResident'], null),
            fatca: get(residencyInfo, ['fatca'], null),
        },
    };
};

const fromContractor = (c: Contractor): FormValue => {
    switch (get(c, ['contractorType'])) {
        case 'IndividualEntityContractor':
            return fromEntity(get(c, ['individualEntity']));
        case 'LegalEntityContractor':
            return fromLegalEntity(get(c, ['legalEntity']));
    }
};

export const toFormValue = (d: QuestionaryData): FormValue => fromContractor(get(d, ['contractor']));
