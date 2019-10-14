import { ContractorType } from './contractor-type';
import { QuestionaryData, Contractor } from '../../../api-codegen/questionary';

const toContractorType = (type: ContractorType) => {
    const e = Contractor.ContractorTypeEnum;
    switch (type) {
        case ContractorType.IndividualEntity:
            return e.IndividualEntity;
        case ContractorType.LegalEntity:
            return e.LegalEntity;
    }
};

export const toQuestionaryData = (type: ContractorType): QuestionaryData => ({
    contractor: {
        contractorType: toContractorType(type)
    }
});
