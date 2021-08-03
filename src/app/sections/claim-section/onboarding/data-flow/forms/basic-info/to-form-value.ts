import get from 'lodash-es/get';

import { Contractor, IndividualEntity, LegalEntity, QuestionaryData } from '@dsh/api-codegen/questionary';

import { FormValue } from '../form-value';

const fromEntity = (i: IndividualEntity | LegalEntity): FormValue => ({
    name: get(i, ['name'], null),
    inn: get(i, ['inn'], null),
});

const fromContractor = (c: Contractor): FormValue => {
    switch (get(c, ['contractorType'])) {
        case 'IndividualEntityContractor': {
            const individualEntity = get(c, ['individualEntity']);
            return {
                ...fromEntity(individualEntity),
                registrationPlace: get(individualEntity, ['registrationInfo', 'registrationPlace'], null),
            };
        }
        case 'LegalEntityContractor': {
            const legalEntity = get(c, ['legalEntity']);
            return {
                ...fromEntity(legalEntity),
                registrationPlace: get(legalEntity, ['registrationInfo', 'registrationAddress'], null),
            };
        }
    }
};

export const toFormValue = (d: QuestionaryData): FormValue => ({
    ...fromContractor(get(d, ['contractor'])),
    shopUrl: get(d, ['shopInfo', 'location', 'url'], null),
    shopName: get(d, ['shopInfo', 'details', 'name'], null),
    email: get(d, ['contactInfo', 'email'], null),
    phoneNumber: get(d, ['contactInfo', 'phoneNumber'], null),
});
