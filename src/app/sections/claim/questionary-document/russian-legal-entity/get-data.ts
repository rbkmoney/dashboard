import { RussianLegalEntityQuestionary } from './russian-legal-entity-questionary';
import { getAuthorityConfirmingDocument } from './get-authority-confirming-document';
import {
    toYesNo,
    getMonthOperationSum,
    getMonthOperationCount,
    getDocumentType,
    getShopLocationURL,
    getBusinessInfo,
    getContactInfo
} from '../select-data';

export function getData({ data }: RussianLegalEntityQuestionary) {
    const { contractor } = data;
    const residencyInfo = data.residencyInfo || ({} as any);
    const registrationInfo = data.registrationInfo || ({} as any);
    const { legalEntity } = contractor;
    const { additionalInfo } = legalEntity;

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
            fio: legalEntity.legalOwnerInfo.russianPrivateEntity.fio,
            authorityConfirmingDocument: getAuthorityConfirmingDocument(
                legalEntity.legalOwnerInfo.authorityConfirmingDocument
            ),
            snils: legalEntity.legalOwnerInfo.snils,
            contact: getContactInfo(legalEntity.legalOwnerInfo.russianPrivateEntity.contactInfo || {})
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
        documentType: getDocumentType((legalEntity.propertyInfoDocumentType || ({} as any)).documentType),
        business: getBusinessInfo(additionalInfo),
        pdl: {
            pdlCategory: toYesNo(legalEntity.legalOwnerInfo.pdlCategory),
            pdlRelation: toYesNo(!!legalEntity.legalOwnerInfo.pdlRelationDegree),
            pdlRelationDegree: legalEntity.legalOwnerInfo.pdlRelationDegree
        },
        benefitThirdParties: toYesNo(additionalInfo.benefitThirdParties),
        hasBeneficialOwner: toYesNo(!!legalEntity.beneficialOwner && !!legalEntity.beneficialOwner.length),
        hasRelation: toYesNo(!!additionalInfo.relationIndividualEntity),
        residencyInfo: {
            taxResident: toYesNo(residencyInfo.taxResident),
            ownerResident: toYesNo(residencyInfo.ownerResident),
            fatca: toYesNo(residencyInfo.fatca)
        }
    };
}
