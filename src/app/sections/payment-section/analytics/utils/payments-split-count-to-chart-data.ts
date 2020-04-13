import { translate } from '@ngneat/transloco';
import moment from 'moment';

import { SplitCountResult } from '../../../../api-codegen/anapi/swagger-codegen';
import { ChartData } from './chart-data';

export const paymentsSplitCountToChartData = (paymentsSplitCount: Array<SplitCountResult>): ChartData[] =>
    paymentsSplitCount.map(({ currency, statusOffsetCounts }) => {
        statusOffsetCounts.map(s => {
            let offsetCount = s.offsetCount.slice().sort((a, b) => a.offset - b.offset);
            offsetCount[1] = { offset: offsetCount[1].offset, count: offsetCount[1].count + offsetCount[0].count };
            offsetCount = offsetCount.slice(1);
            return { offsetCount, status: s.status };
        });
        return {
            currency,
            series: statusOffsetCounts.map(offsetCounts => ({
                name: translate(
                    `analytics.paymentStatuses.${offsetCounts.status.toString()}`,
                    null,
                    'payment-section|scoped'
                ),
                data: offsetCounts.offsetCount.map(c => c.count)
            })),
            times: statusOffsetCounts[0].offsetCount.map(c => moment(c.offset).format())
        };
    });
