import { toContractor } from './to-contractor';
import { QuestionaryData, Contractor } from '../../../../api-codegen/questionary';

export const contractorTypeToQuestionaryData = (contractorType: Contractor.ContractorTypeEnum): QuestionaryData => ({
    contractor: toContractor(contractorType, null)
});
