import { RussianIndividualEntityQuestionary } from './russian-individual-entity-questionary';
import { ShopLocationUrl, IndividualResidencyInfo } from '../../../api-codegen/questionary';
import { getMonthOperationCount, getMonthOperationSum, getDocumentType, getFIO, toYesNo } from '../select-data';
import { getBusinessInfo } from '../select-data/get-business-info';

export function getData({ data }: RussianIndividualEntityQuestionary) {
    const { individualEntity } = data.contractor;
    const { additionalInfo } = individualEntity;

    return {
        basic: {
            inn: individualEntity.inn,
            name: `ИП ${getFIO(individualEntity.russianPrivateEntity.personAnthroponym)}`,
            brandName: data.shopInfo.details.name,
            snils: individualEntity.snils
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
            monthOperationSum: getMonthOperationSum(additionalInfo.monthOperationSum),
            monthOperationCount: getMonthOperationCount(additionalInfo.monthOperationCount)
        },
        // TODO
        address: {
            country: '-',
            region: '-',
            city: '-',
            street: individualEntity.russianPrivateEntity.actualAddress,
            number: '-',
            building: '-',
            office: '-',
            area: '-'
        },
        documentType: getDocumentType(individualEntity.propertyInfoDocumentType.documentType),
        business: getBusinessInfo(additionalInfo),
        pdl: {
            pdlCategory: toYesNo(individualEntity.individualPersonCategories.foreignPublicPerson),
            pdlRelation: toYesNo(individualEntity.individualPersonCategories.foreignRelativePerson),
            pdlRelationDegree: '' // TODO
        },
        benefitThirdParties: toYesNo(additionalInfo.benefitThirdParties),
        hasBeneficialOwner: toYesNo(individualEntity.beneficialOwners && individualEntity.beneficialOwners.length),
        hasRelation: toYesNo(additionalInfo.relationIndividualEntity),
        taxResident: toYesNo((individualEntity.residencyInfo as IndividualResidencyInfo).usaTaxResident)
    };
}
