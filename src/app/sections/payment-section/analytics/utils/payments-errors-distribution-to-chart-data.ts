import { PaymentsErrorsDistributionResult } from '../../../../api-codegen/anapi/swagger-codegen';
import { DistributionChartData } from './distribution-chart-data';

export const paymentsErrorsDistributionToChartData = (
    distribution: PaymentsErrorsDistributionResult[]
): DistributionChartData => {
    const data: number[] = [];
    const labels: string[] = [];
    distribution.forEach(d => {
        data.push(d.percents);
        labels.push(d.error);
    });
    return { series: [{ data }], labels };
};
