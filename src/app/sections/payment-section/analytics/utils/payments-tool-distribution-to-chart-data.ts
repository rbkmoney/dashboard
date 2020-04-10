import { PaymentsToolDistributionResult } from '../../../../api-codegen/anapi/swagger-codegen';
import { DistributionChartData } from './distribution-chart-data';

export const paymentsToolDistributionToChartData = (
    distribution: PaymentsToolDistributionResult[]
): DistributionChartData => {
    const series: number[] = distribution.map(d => d.percents);
    const labels: string[] = distribution.map(d => d.name);
    return { series, labels };
};
