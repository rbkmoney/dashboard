export enum StepName {
    BasicInfo = 'basic-info',
    FinancialAndEconomicActivity = 'financial-and-economic-activity',
    BeneficialOwners = 'beneficial-owners',
    PlanningOperationsAndPayoutTool = 'planning-operations-and-payout-tool',
    DocumentsUpload = 'documents-upload',
    RussianPrivateEntity = 'russian-private-entity',
    RussianLegalOwner = 'russian-legal-owner'
}

const BasicStepFlow = [
    StepName.BasicInfo,
    null,
    StepName.FinancialAndEconomicActivity,
    StepName.BeneficialOwners,
    StepName.PlanningOperationsAndPayoutTool,
    StepName.DocumentsUpload
];

const insertStepToBasicFlow = (step: StepName): StepName[] => BasicStepFlow.map(s => (s === null ? step : s));

export const IndividualEntityStepFlow = insertStepToBasicFlow(StepName.RussianPrivateEntity);
export const LegalEntityStepFlow = insertStepToBasicFlow(StepName.RussianLegalOwner);
