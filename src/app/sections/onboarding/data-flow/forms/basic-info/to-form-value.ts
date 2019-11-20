import get from 'lodash.get';

import { QuestionaryData, IndividualEntity, Contractor, LegalEntity } from '../../../../../api-codegen/questionary';
import { FormValue } from '../form-value';

const fromEntity = (i: IndividualEntity | LegalEntity): FormValue => ({
    name: get(i, ['name'], null),
    inn: get(i, ['inn'], null),
    registrationPlace: get(i, ['registrationInfo', 'registrationAddress'], null)
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
    shopUrl: get(d, ['shopInfo', 'location', 'url'], null),
    shopName: get(d, ['shopInfo', 'details', 'name'], null),
    email: get(d, ['contactInfo', 'email'], null),
    phoneNumber: get(d, ['contactInfo', 'phoneNumber'], null)
});
