import { translate } from '@ngneat/transloco';
import sortBy from 'lodash.sortby';

import { PaymentsToolDistributionResult } from '../../../../api-codegen/anapi/swagger-codegen';
import { DistributionChartData } from '../utils';

const sortSeries = (distribution: number[]) => sortBy(distribution, d => -d);

const getSeries = (distribution: PaymentsToolDistributionResult[]): number[] =>
    sortSeries(distribution.map(d => d.percents));

const getLabels = (distribution: PaymentsToolDistributionResult[]): string[] =>
    translate(
        distribution.map(d => `analytics.paymentToolsList.${d.name}`),
        null,
        'payment-section|scoped'
    );

export const paymentsToolDistributionToChartData = (
    distribution: PaymentsToolDistributionResult[]
): DistributionChartData => ({
    series: getSeries(distribution),
    labels: getLabels(distribution)
});
