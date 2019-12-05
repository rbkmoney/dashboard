import { StepName } from './step-name';

const BasicStepFlow = [
    StepName.BasicInfo,
    null,
    StepName.FinancialAndEconomicActivity,
    StepName.BeneficialOwners,
    StepName.PlanningOperationsAndPayoutTool
];

const insertStepToBasicFlow = (step: StepName): StepName[] => BasicStepFlow.map(s => (s === null ? step : s));

export const IndividualEntityStepFlow = insertStepToBasicFlow(StepName.RussianPrivateEntity);
export const LegalEntityStepFlow = insertStepToBasicFlow(StepName.RussianLegalOwner);
