import get from 'lodash.get';

import { QuestionaryData, Contractor, IndividualEntity, LegalEntity } from '../../../../../api-codegen/questionary';
import { FormValue } from '../form-value';

const fromEntity = (l: LegalEntity | IndividualEntity): FormValue => {
    const additionalInfo = get(l, ['additionalInfo']);
    const accountantInfo = get(additionalInfo, ['accountantInfo']);
    return {
        staffCount: get(additionalInfo, ['staffCount'], null),
        withoutAccountant: get(accountantInfo, ['accountantInfoType']) === 'WithoutChiefAccountant',
        accountantType: get(accountantInfo, ['withoutChiefAccountantType'], null),
        hasBeneficiaryParty: false, // TODO need backend implementation
        hasLiquidationProcess: false // TODO need backend implementation
    };
};

const fromContractor = (c: Contractor): FormValue => {
    switch (get(c, ['contractorType'])) {
        case 'IndividualEntityContractor':
            return fromEntity(get(c, ['individualEntity']));
        case 'LegalEntityContractor':
            return fromEntity(get(c, ['legalEntity']));
    }
};

export const toFormValue = (d: QuestionaryData): FormValue => fromContractor(get(d, ['contractor']));
