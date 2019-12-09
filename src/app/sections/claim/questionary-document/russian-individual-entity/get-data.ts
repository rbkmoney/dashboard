import { RussianIndividualEntityQuestionary } from './russian-individual-entity-questionary';
import { getDocumentType, toYesNo, getShopLocationURL } from '../select-data';
import { getBusinessInfo } from '../select-data/get-business-info';
import { getIndividualEntityName } from './get-individual-entity-name';

export function getData({ data }: RussianIndividualEntityQuestionary) {
    const { individualEntity } = data.contractor;
    const { additionalInfo, russianPrivateEntity, residencyInfo, registrationInfo } = individualEntity;

    return {
        basic: {
            inn: individualEntity.inn,
            name: getIndividualEntityName(russianPrivateEntity.fio),
            brandName: data.shopInfo.details.name,
            snils: individualEntity.snils
        },
        contact: {
            phone: data.contactInfo.phoneNumber,
            url: getShopLocationURL(data.shopInfo.location),
            email: data.contactInfo.email
        },
        relationshipsWithNko: {
            nkoRelationTarget: additionalInfo.nkoRelationTarget,
            relationshipWithNko: additionalInfo.relationshipWithNko
        },
        monthOperation: {
            monthOperationSum: additionalInfo.monthOperationSum,
            monthOperationCount: additionalInfo.monthOperationCount
        },
        // TODO
        address: {
            country: '-',
            region: '-',
            city: '-',
            street: registrationInfo.registrationPlace,
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
        hasBeneficialOwner: toYesNo(!!individualEntity.beneficialOwners && !!individualEntity.beneficialOwners.length),
        hasRelation: toYesNo(!!additionalInfo.relationIndividualEntity),
        taxResident: toYesNo(residencyInfo.usaTaxResident)
    };
}
