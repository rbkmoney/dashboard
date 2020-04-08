import moment from 'moment';

import { SplitCountResult } from '../../../../api-codegen/anapi/swagger-codegen';
import { ChartData } from './chart-data';

export const paymentsSplitCountToChartData = (paymentsSplitCount: Array<SplitCountResult>): ChartData[] =>
    paymentsSplitCount.map(({ currency, statusOffsetCounts }) => {
        statusOffsetCounts.forEach(s => {
            s.offsetCount.sort((a, b) => a.offset - b.offset);
            s.offsetCount[1].count += s.offsetCount[0].count;
            s.offsetCount.shift();
        });
        return {
            currency,
            series: statusOffsetCounts.map(offsetCounts => ({
                name: offsetCounts.status.toString(),
                data: offsetCounts.offsetCount.map(c => c.count)
            })),
            times: statusOffsetCounts[0].offsetCount.map(c => moment(c.offset).format())
        };
    });
