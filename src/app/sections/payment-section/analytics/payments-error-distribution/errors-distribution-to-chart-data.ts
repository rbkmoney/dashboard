import { translate } from '@ngneat/transloco';

import { DistributionChartData } from '../utils';
import { ErrorDistribution } from './error-distribution';

const filterErrors = (errors: ErrorDistribution[]): ErrorDistribution[] => errors.filter((e) => e.percents > 0);

const errorsToSeries = (errors: ErrorDistribution[]): number[] => {
    const sum = errors.reduce((acc, curr) => (acc += curr.percents), 0);
    const multiplier = 100 / sum;
    return errors.map((d) => d.percents * multiplier);
};

const errorsToLabels = (errors: ErrorDistribution[]): string[] =>
    errors.map((d) => translate(`analytics.errorCodes.${d.errorCode}`, null, 'payment-section|scoped'));

export const errorsDistributionToChartData = (distribution: ErrorDistribution[]): DistributionChartData => {
    const filtered = filterErrors(distribution);
    return { series: errorsToSeries(filtered), labels: errorsToLabels(filtered) };
};
