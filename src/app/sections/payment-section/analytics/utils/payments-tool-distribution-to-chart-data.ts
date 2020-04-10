import { translate } from '@ngneat/transloco';

import { PaymentsToolDistributionResult } from '../../../../api-codegen/anapi/swagger-codegen';
import { DistributionChartData } from './distribution-chart-data';

export const paymentsToolDistributionToChartData = (
    distribution: PaymentsToolDistributionResult[]
): DistributionChartData => {
    const series: number[] = distribution.map(d => d.percents);
    const labels: string[] = translate(
        distribution.map(d => `analytics.paymentToolsList.${d.name}`),
        null,
        'payment-section|scoped'
    );
    return { series, labels };
};
