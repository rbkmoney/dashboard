import { RussianIndividualEntityQuestionary } from './russian-individual-entity-questionary';
import {
    ShopLocationUrl,
    MonthOperationCount,
    MonthOperationSum,
    IndividualResidencyInfo,
    AccountingOrganization,
    AccountantInfo,
    WithoutChiefAccountant,
    PropertyInfoDocumentType
} from '../../../api-codegen/questionary';
import { getFIO } from '../select-data';

function hasChiefAccountant(accountantInfo: AccountantInfo): boolean {
    return accountantInfo.accountantInfoType === AccountantInfo.AccountantInfoTypeEnum.WithChiefAccountant;
}

function accountingType(accountantInfo: AccountantInfo): number {
    switch (accountantInfo.accountantInfoType) {
        case AccountantInfo.AccountantInfoTypeEnum.WithChiefAccountant:
            return 2;
        case AccountantInfo.AccountantInfoTypeEnum.WithChiefAccountant:
            switch ((accountantInfo as WithoutChiefAccountant).withoutChiefAccountantType) {
                case WithoutChiefAccountant.WithoutChiefAccountantTypeEnum.AccountingOrganization:
                    return 1;
                case WithoutChiefAccountant.WithoutChiefAccountantTypeEnum.HeadAccounting:
                    return 2;
                case WithoutChiefAccountant.WithoutChiefAccountantTypeEnum.IndividualAccountant:
                    return 0;
            }
    }
}

function getDocumentType(documentType: PropertyInfoDocumentType.DocumentTypeEnum): number {
    switch (documentType) {
        case PropertyInfoDocumentType.DocumentTypeEnum.LeaseContract:
            return 0;
        case PropertyInfoDocumentType.DocumentTypeEnum.SubleaseContract:
            return 1;
        case PropertyInfoDocumentType.DocumentTypeEnum.CertificateOfOwnership:
            return 2;
        case PropertyInfoDocumentType.DocumentTypeEnum.OtherPropertyInfoDocumentType:
            return 3; // TODO not used
    }
}

export function getData({ data }: RussianIndividualEntityQuestionary) {
    const { individualEntity } = data.contractor;
    const { additionalInfo } = individualEntity;

    const monthOperationCount = [
        MonthOperationCount.LtTen,
        MonthOperationCount.BtwTenToFifty,
        MonthOperationCount.GtFifty
    ].findIndex(count => count === additionalInfo.monthOperationCount);

    const monthOperationSum = [
        MonthOperationSum.LtFiveHundredThousand,
        MonthOperationSum.BtwFiveHundredThousandToOneMillion,
        MonthOperationSum.GtOneMillion
    ].findIndex(sum => sum === additionalInfo.monthOperationSum);

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
            monthOperationSum,
            monthOperationCount
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
            hasChiefAccountant: Number(!hasChiefAccountant(additionalInfo.accountantInfo)),
            staffCount: additionalInfo.staffCount,
            accounting: accountingType(additionalInfo.accountantInfo),
            accountingOrgInn: (additionalInfo.accountantInfo as AccountingOrganization).inn
        },
        individualPersonCategories: {
            foreignPublicPerson: Number(!individualEntity.individualPersonCategories.foreignPublicPerson),
            foreignRelativePerson: Number(!individualEntity.individualPersonCategories.foreignRelativePerson),
            relationDegree: '' // TODO
        },
        benefitThirdParties: Number(additionalInfo.benefitThirdParties),
        hasBeneficialOwner: Number(individualEntity.beneficialOwners && individualEntity.beneficialOwners.length),
        hasRelation: Number(!additionalInfo.relationIndividualEntity),
        taxResident: Number(!(individualEntity.residencyInfo as IndividualResidencyInfo).usaTaxResident)
    };
}
