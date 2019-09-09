import { RussianIndividualEntityQuestionary } from './russian-individual-entity-questionary';
import {
    ShopLocationUrl,
    MonthOperationCount as MonthOperationCountEnum,
    MonthOperationSum as MonthOperationSumEnum,
    IndividualResidencyInfo,
    AccountingOrganization,
    AccountantInfo,
    WithoutChiefAccountant,
    PropertyInfoDocumentType
} from '../../../api-codegen/questionary';
import { getFIO } from '../select-data';
import { YesNo } from '../yes-no';

function hasChiefAccountant(accountantInfo: AccountantInfo): YesNo {
    return accountantInfo.accountantInfoType === AccountantInfo.AccountantInfoTypeEnum.WithChiefAccountant
        ? YesNo.yes
        : YesNo.no;
}

export enum AccountingType {
    AccountingOrganization,
    HeadAccounting,
    IndividualAccountant
}

function accountingType(accountantInfo: AccountantInfo): AccountingType {
    switch (accountantInfo.accountantInfoType) {
        case AccountantInfo.AccountantInfoTypeEnum.WithoutChiefAccountant:
            switch ((accountantInfo as WithoutChiefAccountant).withoutChiefAccountantType) {
                case WithoutChiefAccountant.WithoutChiefAccountantTypeEnum.AccountingOrganization:
                    return AccountingType.AccountingOrganization;
                case WithoutChiefAccountant.WithoutChiefAccountantTypeEnum.HeadAccounting:
                    return AccountingType.HeadAccounting;
                case WithoutChiefAccountant.WithoutChiefAccountantTypeEnum.IndividualAccountant:
                    return AccountingType.IndividualAccountant;
            }
    }
    return null;
}

export enum DocumentType {
    LeaseContract,
    SubleaseContract,
    CertificateOfOwnership
}

function getDocumentType(documentType: PropertyInfoDocumentType.DocumentTypeEnum): DocumentType {
    switch (documentType) {
        case PropertyInfoDocumentType.DocumentTypeEnum.LeaseContract:
            return DocumentType.LeaseContract;
        case PropertyInfoDocumentType.DocumentTypeEnum.SubleaseContract:
            return DocumentType.SubleaseContract;
        case PropertyInfoDocumentType.DocumentTypeEnum.CertificateOfOwnership:
            return DocumentType.CertificateOfOwnership;
        case PropertyInfoDocumentType.DocumentTypeEnum.OtherPropertyInfoDocumentType: // TODO not used
    }
    return null;
}

export enum MonthOperationCount {
    LtTen,
    BtwTenToFifty,
    GtFifty
}

export enum MonthOperationSum {
    LtFiveHundredThousand,
    BtwFiveHundredThousandToOneMillion,
    GtOneMillion
}

function getMonthOperationCount(monthOperationCount: MonthOperationCountEnum): MonthOperationCount {
    switch (monthOperationCount) {
        case MonthOperationCountEnum.GtFifty:
            return MonthOperationCount.GtFifty;
        case MonthOperationCountEnum.BtwTenToFifty:
            return MonthOperationCount.BtwTenToFifty;
        case MonthOperationCountEnum.LtTen:
            return MonthOperationCount.LtTen;
    }
    return null;
}

function getMonthOperationSum(monthOperationSum: MonthOperationSumEnum): MonthOperationSum {
    switch (monthOperationSum) {
        case MonthOperationSumEnum.GtOneMillion:
            return MonthOperationSum.GtOneMillion;
        case MonthOperationSumEnum.BtwFiveHundredThousandToOneMillion:
            return MonthOperationSum.BtwFiveHundredThousandToOneMillion;
        case MonthOperationSumEnum.LtFiveHundredThousand:
            return MonthOperationSum.LtFiveHundredThousand;
    }
    return null;
}

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
