import { StepName } from '../step-flow';

export type ValidateFn = () => void;
export type ValiditySteps = Map<StepName, { isValid: boolean; validate: ValidateFn }>;
