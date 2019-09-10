import { RussianLegalEntityQuestionary } from './russian-legal-entity-questionary';
import { LegalRegistrationInfo, LegalResidencyInfo } from '../../../api-codegen/questionary';
import {
    getFIO,
    toYesNo,
    getMonthOperationSum,
    getMonthOperationCount,
    getDocumentType,
    getShopLocationURL
} from '../select-data';
import { getBusinessInfo } from '../select-data/get-business-info';

export function getData({ data }: RussianLegalEntityQuestionary) {
    const { legalEntity } = data.contractor;
    const { additionalInfo } = legalEntity;
    // TODO: удалить приведение типа после изменения в протоколе/сваге
    const residencyInfo = legalEntity.residencyInfo as LegalResidencyInfo;

    return {
        basic: {
            inn: data.contractor.legalEntity.inn,
            name: data.shopInfo.details.name,
            brandName: data.contractor.legalEntity.name
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
            monthOperationSum: getMonthOperationSum(additionalInfo.monthOperationSum),
            monthOperationCount: getMonthOperationCount(additionalInfo.monthOperationCount)
        },
        legalOwnerInfo: {
            fio: getFIO(legalEntity.legalOwnerInfo.russianPrivateEntity.personAnthroponym),
            basedOn: '-', // TODO
            snils: legalEntity.legalOwnerInfo.snils,
            contact: [
                legalEntity.legalOwnerInfo.russianPrivateEntity.contactInfo.phoneNumber,
                legalEntity.legalOwnerInfo.russianPrivateEntity.contactInfo.email
            ]
                .filter(i => !!i)
                .join(', ')
        },
        // TODO
        address: {
            country: '-',
            region: '-',
            city: '-',
            street: (legalEntity.registrationInfo as LegalRegistrationInfo).actualAddress,
            number: '-',
            building: '-',
            office: '-',
            area: '-'
        },
        documentType: getDocumentType(legalEntity.propertyInfoDocumentType.documentType),
        business: getBusinessInfo(additionalInfo),
        pdl: {
            pdlCategory: toYesNo(legalEntity.legalOwnerInfo.pdlCategory),
            pdlRelation: toYesNo(legalEntity.legalOwnerInfo.pdlRelationDegree),
            pdlRelationDegree: legalEntity.legalOwnerInfo.pdlRelationDegree
        },
        benefitThirdParties: toYesNo(additionalInfo.benefitThirdParties),
        hasBeneficialOwner: toYesNo(legalEntity.beneficialOwner && legalEntity.beneficialOwner.length),
        hasRelation: toYesNo(additionalInfo.relationIndividualEntity),
        residencyInfo: {
            taxResident: toYesNo(residencyInfo.taxResident),
            ownerResident: toYesNo(residencyInfo.ownerResident),
            fatca: toYesNo(residencyInfo.fatca)
        }
    };
}
