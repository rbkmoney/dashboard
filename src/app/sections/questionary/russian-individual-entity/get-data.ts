import { RussianIndividualEntityQuestionary } from './russian-individual-entity-questionary';
import { ShopLocationUrl } from '../../../api-codegen/questionary';

export function getData({ data }: RussianIndividualEntityQuestionary) {
    const personAnthroponym = data.contractor.individualEntity.russianPrivateEntity.personAnthroponym;
    const fullName = `${personAnthroponym.secondName} ${personAnthroponym.firstName} ${personAnthroponym.middleName}`;
    return {
        basic: {
            inn: data.contractor.individualEntity.inn,
            name: `ИП ${fullName}`,
            brandName: data.shopInfo.details.name,
            snils: ''
        },
        contact: {
            phone: data.contactInfo.phoneNumber,
            url: (data.shopInfo.location as ShopLocationUrl).url,
            email: data.contactInfo.email
        },
        relationshipsWithNko: {
            nkoRelationTarget: data.contractor.individualEntity.additionalInfo.nkoRelationTarget,
            relationshipWithNko: data.contractor.individualEntity.additionalInfo.relationshipWithNko
        },
        monthOperation: {
            monthOperationSum: data.contractor.individualEntity.additionalInfo.monthOperationSum,
            monthOperationCount: data.contractor.individualEntity.additionalInfo.montOperationCount
        },
        address: {
            country: '-',
            region: '-',
            city: '-',
            street: data.contractor.individualEntity.russianPrivateEntity.actualAddress,
            house: '-',
            building: '-',
            office: '-',
            area: '-'
        }
    };
}
