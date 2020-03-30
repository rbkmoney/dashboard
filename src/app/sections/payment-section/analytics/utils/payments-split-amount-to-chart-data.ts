import { Moment } from 'moment';

import { SplitAmountResult } from '../../../../api-codegen/anapi/swagger-codegen';
import { ChartData } from './chart-data';

export const paymentsSplitAmountToChartData = (
    paymentsSplitAmount: Array<SplitAmountResult>,
    fromTime: Moment
): ChartData[] =>
    paymentsSplitAmount.map(paymentSplitAmount => ({
        currency: paymentSplitAmount.currency,
        series: [
            {
                data: paymentSplitAmount.offsetAmounts.map(offsetAmount => offsetAmount.amount)
            }
        ],
        times: paymentSplitAmount.offsetAmounts.map((_, i) =>
            fromTime
                .add(i, paymentSplitAmount.splitUnit)
                .utc()
                .format()
        )
    }));
