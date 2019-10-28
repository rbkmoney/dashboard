import get from 'lodash.get';

import {
    LegalEntityContractor,
    RussianLegalEntity,
    QuestionaryData,
    ShopInfo,
    ContactInfo,
    ShopLocation
} from '../../../../../api-codegen/questionary';
import { FormValue } from '../form-value';

const applyToContractor = (
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
                registrationAddress: registrationPlace
            }
        } as RussianLegalEntity
    };
};

const applyToShopInfo = (t: ShopInfo, { shopUrl, shopName }: FormValue): ShopInfo => {
    const location = get(t, ['location']);
    const details = get(t, ['shopInfo', 'details']);
    return {
        ...t,
        location: {
            ...location,
            locationType: ShopLocation.LocationTypeEnum.ShopLocationUrl,
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
