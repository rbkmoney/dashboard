import { RussianLegalEntityQuestionary } from './russian-legal-entity-questionary';

export function getData({ data }: RussianLegalEntityQuestionary) {
    return {
        basic: {
            inn: data.contractor.legalEntity.inn,
            name: data.shopInfo.details.name,
            brandName: data.contractor.legalEntity.name
        },
        contact: {
            phone: data.contactInfo.phoneNumber,
            url: '',
            email: data.contactInfo.email
        }
    };
}
