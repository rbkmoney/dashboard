import { RussianLegalEntityQuestionary } from './russian-legal-entity-questionary';
import {
    ShopLocationUrl,
    MonthOperationCount,
    MonthOperationSum,
    LegalRegistrationInfo,
    LegalResidencyInfo
} from '../../../api-codegen/questionary';
import { getFIO } from '../select-data';

export function getData({ data }: RussianLegalEntityQuestionary) {
    const { legalEntity } = data.contractor;
    const { additionalInfo } = legalEntity;

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
            monthOperationSum,
            monthOperationCount
        },
        legalOwnerInfo: {
            fio: getFIO(legalEntity.legalOwnerInfo.russianPrivateEntity.personAnthroponym),
            basedOn: '-', // TODO
            snils: '-', // TODO
            contact: `${legalEntity.legalOwnerInfo.russianPrivateEntity.contactInfo.phoneNumber}, ${legalEntity.legalOwnerInfo.russianPrivateEntity.contactInfo.email}`
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
            hasAccountant: Number(!additionalInfo.hasAccountant),
            staffCount: additionalInfo.staffCount,
            accounting: additionalInfo.accounting
                ? 0
                : additionalInfo.accountingOrg
                ? 1
                : additionalInfo.hasAccountant
                ? 2
                : -1,
            accountingOrgInn: '' // TODO
        },
        individualPersonCategories: {
            foreignPublicPerson: '', // TODO
            foreignRelativePerson: '', // TODO
            relationDegree: '' // TODO
        },
        benefitThirdParties: Number(additionalInfo.benefitThirdParties),
        hasBeneficialOwner: -1, // TODO не точно
        hasRelation: Number(!additionalInfo.relationIndividualEntity),
        residencyInfo: {
            taxResident: Number(!(legalEntity.residencyInfo as LegalResidencyInfo).taxResident),
            ownerResident: Number(!(legalEntity.residencyInfo as LegalResidencyInfo).ownerResident),
            fatca: Number(!(legalEntity.residencyInfo as LegalResidencyInfo).fatca)
        }
    };
}
