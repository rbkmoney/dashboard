import { StepName } from './step-name';

const isStep = (s: string): s is StepName => Object.values(StepName).includes(s as StepName);

export const urlToStep = (url: string, defaultStep: StepName = null): StepName => {
    const source = url.split('/');
    const result = source[source.length - 1];
    if (!isStep(result)) {
        return defaultStep;
    }
    return result;
};
