import { SplitAmountResult } from '../../../../api-codegen/anapi/swagger-codegen';
import { ChartData } from './chart-data';

export const paymentsSplitAmountToChartData = (paymentsSplitAmount: Array<SplitAmountResult>): ChartData[] =>
    paymentsSplitAmount.map(
        paymentSplitAmount => ({
            currency: paymentSplitAmount.currency,
            series: [{
                data: paymentSplitAmount.offsetAmounts.map(offsetAmount => offsetAmount.amount)
            }],
            times: []
        })
    );
