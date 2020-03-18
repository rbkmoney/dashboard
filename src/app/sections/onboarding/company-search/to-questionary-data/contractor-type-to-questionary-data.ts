import { Contractor, QuestionaryData } from '../../../../api-codegen/questionary';

export const contractorTypeToQuestionaryData = (contractorType: Contractor.ContractorTypeEnum): QuestionaryData => ({
    contractor: {
        contractorType
    }
});
