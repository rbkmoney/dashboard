import { RussianIndividualEntityQuestionary } from './russian-individual-entity-questionary';

export function getData({ data }: RussianIndividualEntityQuestionary) {
    const personAnthroponym = data.contractor.individualEntity.russianPrivateEntity.personAnthroponym;
    const fullName = `${personAnthroponym.secondName} ${personAnthroponym.firstName} ${personAnthroponym.middleName}`;

    return {
        basic: {
            inn: data.contractor.individualEntity.inn,
            name: `ИП ${fullName}`,
            brandName: `ИП ${fullName}`,
            snils: ''
        },
        contact: {
            phone: data.contactInfo.phoneNumber,
            url: '',
            email: data.contactInfo.email
        }
    };
}
