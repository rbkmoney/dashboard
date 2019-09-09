import { RussianLegalEntityQuestionary } from './russian-legal-entity-questionary';
import {
    ShopLocationUrl,
    MonthOperationCount,
    MonthOperationSum,
    LegalRegistrationInfo,
    LegalResidencyInfo,
    AccountantInfo,
    WithoutChiefAccountant
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

export function getData({ data }: RussianLegalEntityQuestionary) {
    const { legalEntity } = data.contractor;
    const { additionalInfo } = legalEntity;

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
            hasAccountant: Number(!hasChiefAccountant(additionalInfo.accountantInfo)),
            staffCount: additionalInfo.staffCount,
            accounting: accountingType(additionalInfo.accountantInfo),
            accountingOrgInn: '' // TODO
        },
        individualPersonCategories: {
            foreignPublicPerson: '', // TODO
            foreignRelativePerson: '', // TODO
            relationDegree: '' // TODO
        },
        benefitThirdParties: Number(additionalInfo.benefitThirdParties),
        hasBeneficialOwner: Number(legalEntity.beneficialOwner && legalEntity.beneficialOwner.length),
        hasRelation: Number(!additionalInfo.relationIndividualEntity),
        residencyInfo: {
            taxResident: Number(!(legalEntity.residencyInfo as LegalResidencyInfo).taxResident),
            ownerResident: Number(!(legalEntity.residencyInfo as LegalResidencyInfo).ownerResident),
            fatca: Number(!(legalEntity.residencyInfo as LegalResidencyInfo).fatca)
        }
    };
}
