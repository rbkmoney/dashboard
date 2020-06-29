import { PaymentsSubErrorsDistributionResult } from '../../../../api-codegen/anapi/swagger-codegen';
import { SubError } from '../../../../api-codegen/capi/swagger-codegen';
import { ErrorDistribution } from './error-distribution';
import { knownErrors } from './known-errors';

const subErrorToDistribution = (error: SubError, percents: number): ErrorDistribution => ({
    errorCode: knownErrors.includes(error.code) ? error.code : 'other',
    subErrors: error.subError ? [subErrorToDistribution(error.subError, percents)] : [],
    percents,
});

const groupDistribution = (distribution: ErrorDistribution[]): ErrorDistribution[] =>
    distribution.reduce((acc: ErrorDistribution[], curr) => {
        const index = acc.findIndex((a) => a.errorCode === curr.errorCode);
        const error = acc[index];
        let newAcc;
        if (error) {
            const updated = acc.filter((_, i) => i !== index);
            updated.push({
                errorCode: error.errorCode,
                percents: error.percents + curr.percents,
                subErrors: groupDistribution(error.subErrors.concat(curr.subErrors)),
            });
            newAcc = updated;
        } else {
            newAcc = acc.concat(curr);
        }
        return newAcc;
    }, []);

export const subErrorsToErrorDistribution = (errors: PaymentsSubErrorsDistributionResult[]): ErrorDistribution[] => {
    const errorDistribution: ErrorDistribution[] = errors.map(({ error, percents }) => ({
        errorCode: knownErrors.includes(error.code) ? error.code : 'other',
        subErrors: error.subError ? [subErrorToDistribution(error.subError, percents)] : [],
        percents,
    }));
    return groupDistribution(errorDistribution);
};
