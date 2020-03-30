import { PaymentsToolDistributionResult } from '../../../../api-codegen/anapi/swagger-codegen';
import { DistributionChartData } from './distribution-chart-data';

export const paymentsToolDistributionToChartData = (
    distribution: PaymentsToolDistributionResult[]
): DistributionChartData => {
    const data: number[] = [];
    const labels: string[] = [];
    distribution.forEach(d => {
        data.push(d.percents);
        labels.push(d.name);
    });
    return { series: [{ data }], labels };
};
