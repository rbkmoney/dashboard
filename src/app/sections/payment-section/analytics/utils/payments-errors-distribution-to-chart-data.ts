import { translate } from '@ngneat/transloco';

import { PaymentsErrorsDistributionResult } from '../../../../api-codegen/anapi/swagger-codegen';
import { DistributionChartData } from './distribution-chart-data';

export const paymentsErrorsDistributionToChartData = (
    distribution: PaymentsErrorsDistributionResult[]
): DistributionChartData => {
    const errors = groupErrors(distribution);
    const series: number[] = errors.map(d => d.percents);
    const errorCodes: string[] = errors.map(d => `analytics.errorCodes.${d.error.split("'")[1] || 'unknownError'}`);
    const labels: string[] = translate(errorCodes, null, 'payment-section|scoped');
    return { series, labels };
};

const groupErrors = (errors: PaymentsErrorsDistributionResult[]): PaymentsErrorsDistributionResult[] => {
    errors.sort((a, b) => b.percents - a.percents);
    const groupedErrors: PaymentsErrorsDistributionResult[] = [];
    for (let i = 0; i < 5; i++) {
        if (errors[0].percents > 1) {
            groupedErrors.push(errors.shift());
        } else {
            break;
        }
    }
    const otherErrors: number = errors.map(e => e.percents).reduce((prev, curr) => prev + curr);
    groupedErrors.push({ error: "'otherErrors'", percents: otherErrors });
    groupedErrors.sort((a, b) => b.percents - a.percents);
    return groupedErrors;
};
