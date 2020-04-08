import moment from 'moment';

import { SplitAmountResult } from '../../../../api-codegen/anapi/swagger-codegen';
import { ChartData } from './chart-data';

export const paymentsSplitAmountToChartData = (paymentsSplitAmount: Array<SplitAmountResult>): ChartData[] =>
    paymentsSplitAmount.map(({ currency, offsetAmounts }) => {
        offsetAmounts.sort((a, b) => a.offset - b.offset);
        offsetAmounts[1].amount += offsetAmounts[0].amount;
        offsetAmounts.shift();
        return {
            currency,
            series: [
                {
                    data: offsetAmounts.map(offsetAmount => offsetAmount.amount)
                }
            ],
            times: offsetAmounts.map(offsetAmount => moment(offsetAmount.offset).format())
        };
    });
