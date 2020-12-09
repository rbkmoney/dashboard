import { Contractor, QuestionaryData } from '@dsh/api-codegen/questionary';

export const contractorTypeToQuestionaryData = (contractorType: Contractor.ContractorTypeEnum): QuestionaryData => ({
    contractor: {
        contractorType,
    },
});
