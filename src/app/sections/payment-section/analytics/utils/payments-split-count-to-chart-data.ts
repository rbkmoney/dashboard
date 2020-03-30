import { Moment } from 'moment';

import { SplitCountResult } from '../../../../api-codegen/anapi/swagger-codegen';
import { ChartData } from './chart-data';

export const paymentsSplitCountToChartData = (
    paymentsSplitCount: Array<SplitCountResult>,
    fromTime: Moment
): ChartData[] =>
    paymentsSplitCount.map(paymentSplitCount => ({
        currency: paymentSplitCount.currency,
        series: paymentSplitCount.statusOffsetCounts.map(offsetCounts => ({
            name: offsetCounts.status.toString(),
            data: offsetCounts.offsetCount.map(c => c.count)
        })),
        times: paymentSplitCount.statusOffsetCounts.map((_, i) =>
            fromTime
                .subtract(i, paymentSplitCount.splitUnit)
                .utc()
                .format()
        )
    }));
