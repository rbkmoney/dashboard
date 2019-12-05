import {
    Contractor,
    LegalEntityContractor,
    IndividualEntityContractor,
    IndividualEntity,
    LegalEntity,
    RussianIndividualEntity,
    RussianLegalEntity
} from '../../../../api-codegen/questionary';

const toIndividualEntityContractor = (contractor: Contractor, inn: string): IndividualEntityContractor => ({
    ...contractor,
    individualEntity: {
        individualEntityType: IndividualEntity.IndividualEntityTypeEnum.RussianIndividualEntity,
        inn
    } as RussianIndividualEntity
});

const toLegalEntityContractor = (contractor: Contractor, inn: string): LegalEntityContractor => ({
    ...contractor,
    legalEntity: {
        legalEntityType: LegalEntity.LegalEntityTypeEnum.RussianLegalEntity,
        inn
    } as RussianLegalEntity
});

export const toContractor = (contractorType: Contractor.ContractorTypeEnum, inn: string): Contractor => {
    const contractor = {
        contractorType
    };
    const e = Contractor.ContractorTypeEnum;
    switch (contractorType) {
        case e.IndividualEntityContractor:
            return toIndividualEntityContractor(contractor, inn);
        case e.LegalEntityContractor:
            return toLegalEntityContractor(contractor, inn);
    }
};
