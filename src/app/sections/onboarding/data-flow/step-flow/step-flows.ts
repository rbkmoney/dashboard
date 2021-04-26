import { StepName } from './step-name';

const BASIC_STEP_FLOW = [
    StepName.BasicInfo,
    null,
    StepName.FinancialAndEconomicActivity,
    StepName.BeneficialOwners,
    StepName.PlanningOperationsAndPayoutTool,
    StepName.UploadDocuments,
];

const insertStepToBasicFlow = (step: StepName): StepName[] => BASIC_STEP_FLOW.map((s) => (s === null ? step : s));

export const INDIVIDUAL_ENTITY_STEP_FLOW = insertStepToBasicFlow(StepName.RussianPrivateEntity);
export const LEGAL_ENTITY_STEP_FLOW = insertStepToBasicFlow(StepName.RussianLegalOwner);
