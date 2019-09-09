import { RussianIndividualEntityQuestionary } from './russian-individual-entity-questionary';
import { ShopLocationUrl, IndividualResidencyInfo, AccountingOrganization } from '../../../api-codegen/questionary';
import { getFIO } from '../select-data';
import { YesNo } from '../yes-no';
import { getMonthOperationSum } from './get-month-operation-sum';
import { getMonthOperationCount } from './get-month-operation-count';
import { accountingType } from './get-accounting-type';
import { getDocumentType } from './get-document-type';
import { hasChiefAccountant } from './has-chief-accountant';

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
        business: {
            hasChiefAccountant: hasChiefAccountant(additionalInfo.accountantInfo),
            staffCount: additionalInfo.staffCount,
            accounting: accountingType(additionalInfo.accountantInfo),
            accountingOrgInn: (additionalInfo.accountantInfo as AccountingOrganization).inn
        },
        individualPersonCategories: {
            foreignPublicPerson: individualEntity.individualPersonCategories.foreignPublicPerson ? YesNo.yes : YesNo.no,
            foreignRelativePerson: individualEntity.individualPersonCategories.foreignRelativePerson
                ? YesNo.yes
                : YesNo.no,
            relationDegree: '' // TODO
        },
        benefitThirdParties: additionalInfo.benefitThirdParties ? YesNo.yes : YesNo.no,
        hasBeneficialOwner:
            individualEntity.beneficialOwners && individualEntity.beneficialOwners.length ? YesNo.yes : YesNo.no,
        hasRelation: additionalInfo.relationIndividualEntity ? YesNo.yes : YesNo.no,
        taxResident: (individualEntity.residencyInfo as IndividualResidencyInfo).usaTaxResident ? YesNo.yes : YesNo.no
    };
}
