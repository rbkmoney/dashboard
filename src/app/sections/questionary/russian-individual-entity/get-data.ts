import { RussianIndividualEntityQuestionary } from './russian-individual-entity-questionary';
import {
    ShopLocationUrl,
    MonthOperationCount,
    MonthOperationSum,
    IndividualResidencyInfo
} from '../../../api-codegen/questionary';

export function getData({ data }: RussianIndividualEntityQuestionary) {
    const { individualEntity } = data.contractor;
    const { additionalInfo } = individualEntity;

    const personAnthroponym = individualEntity.russianPrivateEntity.personAnthroponym;
    const fullName = `${personAnthroponym.secondName} ${personAnthroponym.firstName} ${personAnthroponym.middleName}`;

    const monthOperationCount = [
        MonthOperationCount.LtTen,
        MonthOperationCount.BtwTenToFifty,
        MonthOperationCount.GtFifty
    ].findIndex(count => count === additionalInfo.montOperationCount);

    const monthOperationSum = [
        MonthOperationSum.LtFiveHundredThousand,
        MonthOperationSum.BtwFiveHundredThousandToOneMillion,
        MonthOperationSum.GtOneMillion
    ].findIndex(sum => sum === additionalInfo.monthOperationSum);

    return {
        basic: {
            inn: individualEntity.inn,
            name: `ИП ${fullName}`,
            brandName: data.shopInfo.details.name,
            snils: '' // TODO
        },
        contact: {
            phone: data.contactInfo.phoneNumber,
            url: (data.shopInfo.location as ShopLocationUrl).url,
            email: data.contactInfo.email
        },
        relationshipsWithNko: {
            nkoRelationTarget: additionalInfo.nkoRelationTarget,
            relationshipWithNko: additionalInfo.relationshipWithNko
        },
        monthOperation: {
            monthOperationSum,
            monthOperationCount
        },
        // TODO
        address: {
            country: '-',
            region: '-',
            city: '-',
            street: individualEntity.russianPrivateEntity.actualAddress,
            house: '-',
            building: '-',
            office: '-',
            area: '-'
        },
        documentType: -1, // individualEntity.propertyInfo[0], // TODO: should be number
        business: {
            hasAccountant: Number(!additionalInfo.hasAccountant),
            staffCount: additionalInfo.staffCount,
            accounting: additionalInfo.accounting
                ? 0
                : additionalInfo.accountingOrg
                ? 1
                : additionalInfo.hasAccountant
                ? 2
                : -1
        },
        individualPersonCategories: {
            foreignPublicPerson: Number(!individualEntity.individualPersonCategories.foreignPublicPerson),
            foreignRelativePerson: Number(!individualEntity.individualPersonCategories.foreignRelativePerson),
            relationDegree: '' // TODO
        },
        benefitThirdParties: Number(additionalInfo.benefitThirdParties),
        hasBeneficialOwner: Number(individualEntity.individualPersonCategories.beneficialOwner), // TODO не точно
        hasRelation: Number(!additionalInfo.relationIndividualEntity),
        taxResident: Number(!(individualEntity.residencyInfo as IndividualResidencyInfo).taxResident)
    };
}
