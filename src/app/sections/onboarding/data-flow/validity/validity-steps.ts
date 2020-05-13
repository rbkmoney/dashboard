import { StepName } from '../step-flow';

export type ValidateFn = () => void;

export interface Validity {
    isValid: boolean;
    validate: ValidateFn;
}

export type StepWithValidity = { step: StepName } & Validity;

export type ValiditySteps = Map<StepName, Validity>;
