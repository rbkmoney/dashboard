import get from 'lodash.get';

import {
    LegalEntityContractor,
    RussianLegalEntity,
    QuestionaryData,
    ShopInfo,
    ContactInfo,
    ShopLocation,
    IndividualEntityContractor,
    RussianIndividualEntity
} from '../../../../../api-codegen/questionary';
import { FormValue } from '../form-value';

const applyToLegalEntityContractor = (
    t: LegalEntityContractor,
    { name, inn, registrationPlace }: FormValue
): LegalEntityContractor => {
    const legalEntity = get(t, ['legalEntity']);
    const registrationInfo = get(t, ['legalEntity', 'registrationInfo']);
    return {
        ...t,
        legalEntity: {
            ...legalEntity,
            name,
            inn,
            registrationInfo: {
                ...registrationInfo,
                registrationInfoType: 'LegalRegistrationInfo',
                registrationAddress: registrationPlace
            }
        } as RussianLegalEntity
    };
};

const applyToIndividualEntityContractor = (
    i: IndividualEntityContractor,
    { name, inn, registrationPlace }: FormValue
): IndividualEntityContractor => {
    console.warn('Need to implement RussianIndividualEntity.name', name);
    const individualEntity = get(i, ['individualEntity']);
    const registrationInfo = get(i, ['individualEntity', 'registrationInfo']);
    return {
        ...i,
        individualEntity: {
            ...individualEntity,
            // name,
            inn,
            registrationInfo: {
                ...registrationInfo,
                registrationInfoType: 'IndividualRegistrationInfo',
                registrationAddress: registrationPlace
            }
        } as RussianIndividualEntity
    };
};

const applyToContractor = (t: LegalEntityContractor, v: FormValue): LegalEntityContractor => {
    switch (t.contractorType) {
        case 'LegalEntityContractor':
            return applyToLegalEntityContractor(t, v);
        case 'IndividualEntityContractor':
            return applyToIndividualEntityContractor(t, v);
    }
};

const applyToShopInfo = (t: ShopInfo, { shopUrl, shopName }: FormValue): ShopInfo => {
    const location = get(t, ['location']);
    const details = get(t, ['shopInfo', 'details']);
    return {
        ...t,
        location: {
            ...location,
            locationType: 'ShopLocationUrl',
            url: shopUrl || ''
        } as ShopLocation,
        details: {
            ...details,
            name: shopName,
            description: get(details, ['description'], null)
        }
    };
};

const applyToContactInfo = (t: ContactInfo, { email, phoneNumber }: FormValue): ContactInfo => {
    const contactInfo = get(t, ['contactInfo']);
    return {
        ...contactInfo,
        email,
        phoneNumber
    };
};

export const applyToQuestionaryData = (d: QuestionaryData, v: FormValue): QuestionaryData => ({
    ...d,
    contractor: applyToContractor(d.contractor, v),
    shopInfo: applyToShopInfo(d.shopInfo, v),
    contactInfo: applyToContactInfo(d.contactInfo, v)
});
