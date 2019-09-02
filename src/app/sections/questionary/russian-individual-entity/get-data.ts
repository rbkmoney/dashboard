import { Questionary, IndividualEntityContractor, RussianIndividualEntity } from '../../../api-codegen/questionary';

export function getData(questionary: Questionary) {
    const contactInfo = questionary.data.contactInfo;
    const contractor: IndividualEntityContractor = questionary.data.contractor;
    const individualEntity: RussianIndividualEntity = contractor.individualEntity;

    const fullName = `${individualEntity.russianPrivateEntity.personAnthroponym.secondName} ${individualEntity.russianPrivateEntity.personAnthroponym.firstName} ${individualEntity.russianPrivateEntity.personAnthroponym.middleName}`;

    return {
        basic: {
            inn: individualEntity.inn,
            name: `ИП ${fullName}`,
            brandName: `ИП ${fullName}`,
            snils: ''
        },
        contact: {
            phone: contactInfo.phoneNumber,
            url: '',
            email: contactInfo.email
        }
    };
}
