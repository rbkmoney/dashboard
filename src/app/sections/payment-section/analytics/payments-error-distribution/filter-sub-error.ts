import { ErrorDistribution } from './error-distribution';

export const filterSubError = (errors: ErrorDistribution[], selectedSubError: number[]): ErrorDistribution[] =>
    selectedSubError.length ? filterSubError(errors[selectedSubError[0]].subErrors, selectedSubError.slice(1)) : errors;
