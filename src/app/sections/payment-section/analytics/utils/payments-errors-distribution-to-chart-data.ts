import { translate } from '@ngneat/transloco';

import { PaymentsErrorsDistributionResult } from '../../../../api-codegen/anapi/swagger-codegen';
import { DistributionChartData } from './distribution-chart-data';

const ERRORS_COUNT_TO_SHOW = 4;

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
    const sortedErrors = errors
        .slice()
        .filter(e => e.percents > 0)
        .sort((a, b) => b.percents - a.percents);
    const errorsCountToShow = Math.min(sortedErrors.length, ERRORS_COUNT_TO_SHOW);
    const groupedErrors = sortedErrors.slice(0, errorsCountToShow);
    if (errorsCountToShow < sortedErrors.length) {
        const otherErrors: number = sortedErrors
            .slice(errorsCountToShow)
            .map(e => e.percents)
            .reduce((prev, curr) => prev + curr);
        groupedErrors.push({ error: "'otherErrors'", percents: otherErrors });
        groupedErrors.sort((a, b) => b.percents - a.percents);
    }
    return groupedErrors;
};
