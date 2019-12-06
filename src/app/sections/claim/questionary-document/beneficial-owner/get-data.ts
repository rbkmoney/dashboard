import { BeneficialOwner, RussianDomesticPassport } from '../../../../api-codegen/questionary';
import { toYesNo, getContactInfo } from '../select-data';
import { getResidencyInfo } from './get-residency-info';

export function getData(beneficialOwner: BeneficialOwner, companyName: string, companyInn: number) {
    const { russianPrivateEntity } = beneficialOwner;
    const migrationCardInfo = beneficialOwner.migrationCardInfo || {};
    const residenceApprove = beneficialOwner.residenceApprove || {};
    const identityDocument = beneficialOwner.identityDocument as RussianDomesticPassport;
    const residencyInfo = getResidencyInfo(beneficialOwner.residencyInfo);
    return {
        companyName,
        indicatedInDocuments: -1, // TODO
        ownershipPercentage: beneficialOwner.ownershipPercentage,
        fio: russianPrivateEntity.fio,
        birthDate: russianPrivateEntity.birthDate,
        birthPlace: russianPrivateEntity.birthPlace,
        citizenship: russianPrivateEntity.citizenship,
        inn: String(companyInn),
        identityDocument: {
            name: 'Паспорт РФ',
            seriesNumber: identityDocument.seriesNumber,
            issuer: [identityDocument.issuer, identityDocument.issuerCode].filter(i => !!i).join(', '),
            issuedAt: identityDocument.issuedAt
        },
        migrationCardInfo: {
            cardNumber: migrationCardInfo.cardNumber,
            beginningDate: migrationCardInfo.beginningDate,
            expirationDate: migrationCardInfo.expirationDate
        },
        residenceApprove: {
            name: residenceApprove.name,
            series: residenceApprove.series,
            number: residenceApprove.number,
            beginningDate: residenceApprove.beginningDate,
            expirationDate: residenceApprove.expirationDate
        },
        address: russianPrivateEntity.actualAddress,
        snils: beneficialOwner.snils,
        contact: getContactInfo(russianPrivateEntity.contactInfo || {}),
        pdl: {
            pdlCategory: toYesNo(beneficialOwner.pdlCategory),
            pdlRelation: toYesNo(!!beneficialOwner.pdlRelationDegree),
            pdlRelationDegree: beneficialOwner.pdlRelationDegree,
            usaTaxResident: toYesNo(residencyInfo.usaTaxResident),
            exceptUsaTaxResident: toYesNo(residencyInfo.exceptUsaTaxResident)
        }
    };
}
