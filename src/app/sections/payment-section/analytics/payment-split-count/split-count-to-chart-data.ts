import { translate } from '@ngneat/transloco';
import sortBy from 'lodash.sortby';
import moment from 'moment';

import { OffsetCount, SplitCountResult, StatusOffsetCount } from '../../../../api-codegen/anapi/swagger-codegen';
import { ChartData } from '../utils';

const fixExtraInterval = (offsetCounts: OffsetCount[]): OffsetCount[] =>
    offsetCounts.reduce(
        (acc, curr, index) =>
            index === 1
                ? [
                      {
                          ...curr,
                          count: acc[0].count + curr.count
                      }
                  ]
                : [...acc, curr],
        []
    );

const prepareOffsetCounts = (statusOffsetCounts: StatusOffsetCount[]): StatusOffsetCount[] =>
    statusOffsetCounts.map(
        (statusOffsetCount): StatusOffsetCount => {
            const sorted = sortBy(statusOffsetCount.offsetCount, 'offset');
            return {
                ...statusOffsetCount,
                offsetCount: fixExtraInterval(sorted)
            };
        }
    );

const statusOffsetCountsToTimes = (statusOffsetCounts: StatusOffsetCount[]): string[] =>
    statusOffsetCounts.reduce(
        (acc, curr, index) => (index === 0 ? curr.offsetCount.map(c => moment(c.offset).format()) : acc),
        []
    );

const statusOffsetCountsToSeries = (statusOffsetCounts: StatusOffsetCount[]) =>
    statusOffsetCounts.map(({ status, offsetCount }) => ({
        name: translate(`analytics.paymentStatuses.${status.toString()}`, null, 'payment-section|scoped'),
        data: offsetCount.map(c => c.count)
    }));

export const splitCountToChartData = (splitCounts: SplitCountResult[]): ChartData[] =>
    splitCounts.map(({ currency, statusOffsetCounts }) => {
        const prepared = prepareOffsetCounts(statusOffsetCounts);
        return {
            currency,
            series: statusOffsetCountsToSeries(prepared),
            times: statusOffsetCountsToTimes(prepared)
        };
    });
