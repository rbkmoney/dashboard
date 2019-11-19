import get from 'lodash.get';

import {
    QuestionaryData,
    IndividualEntityContractor,
    IndividualEntity,
    RussianIndividualEntity,
    ResidencyInfo,
    IdentityDocument,
    Contractor
} from '../../../../../api-codegen/questionary/swagger-codegen';
import { FormValue } from '../form-value';
import { RussianPrivateEntity } from '../../../../../api-codegen/capi/swagger-codegen';

const applyToContractor = (
    t: IndividualEntityContractor,
    {
        russianPrivateEntity: { fio, birthDate, birthPlace, residenceAddress, snils },
        russianDomesticPassport,
        pdlInfo,
        individualResidencyInfo
    }: FormValue
): IndividualEntityContractor => {
    const individualEntity = get(t, ['individualEntity']);
    const russianIndividualEntity = get(individualEntity, ['russianIndividualEntity']);
    const russianPrivateEntity = get(russianIndividualEntity, ['russianPrivateEntity']);
    const identityDocument = get(russianIndividualEntity, ['identityDocument']);
    const residencyInfo = get(russianIndividualEntity, ['residencyInfo']);
    return {
        ...t,
        contractorType: Contractor.ContractorTypeEnum.IndividualEntityContractor,
        individualEntity: {
            ...individualEntity,
            individualEntityType: IndividualEntity.IndividualEntityTypeEnum.RussianIndividualEntity,
            russianIndividualEntity: {
                ...russianIndividualEntity,
                ...pdlInfo,
                snils,
                russianPrivateEntity: {
                    ...russianPrivateEntity,
                    fio,
                    birthDate,
                    birthPlace,
                    residenceAddress
                } as RussianPrivateEntity,
                identityDocument: {
                    ...identityDocument,
                    identityDocumentType: IdentityDocument.IdentityDocumentTypeEnum.RussianDomesticPassport,
                    russianDomesticPassport
                } as IdentityDocument,
                residencyInfo: {
                    ...residencyInfo,
                    residencyInfoType: ResidencyInfo.ResidencyInfoTypeEnum.IndividualResidencyInfo,
                    individualResidencyInfo
                } as ResidencyInfo
            } as RussianIndividualEntity
        } as IndividualEntity
    };
};

export const applyToQuestionaryData = (d: QuestionaryData, v: FormValue): QuestionaryData => ({
    ...d,
    contractor: applyToContractor(d.contractor, v)
});
