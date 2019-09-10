import { RussianLegalEntityQuestionary } from './russian-legal-entity-questionary';
import {
    ShopLocationUrl,
    LegalRegistrationInfo,
    LegalResidencyInfo,
    AccountingOrganization
} from '../../../api-codegen/questionary';
import {
    getFIO,
    hasChiefAccountant,
    getAccountingType,
    toYesNo,
    getMonthOperationSum,
    getMonthOperationCount
} from '../select-data';

export function getData({ data }: RussianLegalEntityQuestionary) {
    const { legalEntity } = data.contractor;
    const { additionalInfo } = legalEntity;

    return {
        basic: {
            inn: data.contractor.legalEntity.inn,
            name: data.shopInfo.details.name,
            brandName: data.contractor.legalEntity.name
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
        legalOwnerInfo: {
            fio: getFIO(legalEntity.legalOwnerInfo.russianPrivateEntity.personAnthroponym),
            basedOn: '-', // TODO
            snils: '-', // TODO
            contact: [
                legalEntity.legalOwnerInfo.russianPrivateEntity.contactInfo.phoneNumber,
                legalEntity.legalOwnerInfo.russianPrivateEntity.contactInfo.email
            ].join(', ')
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
        documentType: -1,
        business: {
            hasAccountant: hasChiefAccountant(additionalInfo.accountantInfo),
            staffCount: additionalInfo.staffCount,
            accounting: getAccountingType(additionalInfo.accountantInfo),
            accountingOrgInn: (additionalInfo.accountantInfo as AccountingOrganization).inn
        },
        individualPersonCategories: {
            foreignPublicPerson: '', // TODO
            foreignRelativePerson: '', // TODO
            relationDegree: '' // TODO
        },
        benefitThirdParties: toYesNo(additionalInfo.benefitThirdParties),
        hasBeneficialOwner: toYesNo(legalEntity.beneficialOwner && legalEntity.beneficialOwner.length),
        hasRelation: toYesNo(additionalInfo.relationIndividualEntity),
        residencyInfo: {
            taxResident: toYesNo((legalEntity.residencyInfo as LegalResidencyInfo).taxResident),
            ownerResident: toYesNo((legalEntity.residencyInfo as LegalResidencyInfo).ownerResident),
            fatca: toYesNo((legalEntity.residencyInfo as LegalResidencyInfo).fatca)
        }
    };
}
