import { StepName } from './step-name';

const isStep = (s: string): s is StepName => Object.values(StepName).includes(s as StepName);

export const toInitialStep = (url: string): StepName | null => {
    const source = url.split('/');
    const result = source[source.length - 1];
    if (!isStep(result)) {
        return null;
    }
    return result;
};
