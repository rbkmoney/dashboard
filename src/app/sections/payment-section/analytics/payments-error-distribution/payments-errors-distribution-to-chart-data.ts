import sortBy from 'lodash.sortby';

import { PaymentsErrorsDistributionResult } from '../../../../api-codegen/anapi/swagger-codegen';
import { DistributionChartData } from '../utils';

const ERRORS_COUNT_TO_SHOW = 4;

const filterErrors = (errors: PaymentsErrorsDistributionResult[]): PaymentsErrorsDistributionResult[] =>
    errors.filter((e) => e.percents > 0);

const sortErrorsByPercents = (errors: PaymentsErrorsDistributionResult[]): PaymentsErrorsDistributionResult[] =>
    sortBy(errors, (e) => -e.percents);

const groupErrors = (errors: PaymentsErrorsDistributionResult[], count: number): PaymentsErrorsDistributionResult[] => {
    const groupedErrors = errors.slice(0, count);
    const otherErrorsSummary = errors
        .slice(count)
        .map((e) => e.percents)
        .reduce((prev, curr) => prev + curr);
    groupedErrors.push({ error: 'Other', percents: otherErrorsSummary });
    return groupedErrors;
};

const prepareErrors = (errors: PaymentsErrorsDistributionResult[]): PaymentsErrorsDistributionResult[] => {
    const sortedErrors = sortErrorsByPercents(filterErrors(errors));
    const errorsCountToShow = Math.min(sortedErrors.length, ERRORS_COUNT_TO_SHOW);
    if (errorsCountToShow < sortedErrors.length) {
        return sortErrorsByPercents(groupErrors(sortedErrors, errorsCountToShow));
    }
    return sortedErrors;
};

const errorsToSeries = (errors: PaymentsErrorsDistributionResult[]): number[] => errors.map((d) => d.percents);

const errorsToLabels = (errors: PaymentsErrorsDistributionResult[]): string[] =>
    errors.map((d) => d.error.split("'")[3] || d.error || 'Unknown error');

export const paymentsErrorsDistributionToChartData = (
    distribution: PaymentsErrorsDistributionResult[]
): DistributionChartData => {
    const prepared = prepareErrors(distribution);
    return { series: errorsToSeries(prepared), labels: errorsToLabels(prepared) };
};
