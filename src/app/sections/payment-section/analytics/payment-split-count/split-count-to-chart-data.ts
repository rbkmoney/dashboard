import { translate } from '@ngneat/transloco';
import sortBy from 'lodash.sortby';
import moment from 'moment';

import { SplitCountResult, SplitUnit, StatusOffsetCount } from '../../../../api-codegen/anapi/swagger-codegen';
import { ChartData, splitUnitToTimeFormat } from '../utils';

const prepareOffsetCounts = (statusOffsetCounts: StatusOffsetCount[]): StatusOffsetCount[] =>
    statusOffsetCounts.map(
        (statusOffsetCount): StatusOffsetCount => {
            const sorted = sortBy(statusOffsetCount.offsetCount, 'offset');
            return {
                ...statusOffsetCount,
                offsetCount: sorted,
            };
        }
    );

const statusOffsetCountsToSeries = (statusOffsetCounts: StatusOffsetCount[], unit: SplitUnit) => {
    return statusOffsetCounts.map(({ status, offsetCount }) => ({
        name: translate(`analytics.paymentStatuses.${status.toString()}`, null, 'payment-section|scoped'),
        data: offsetCount.map((c) => ({
            x: moment(c.offset).format(splitUnitToTimeFormat(unit)),
            y: c.count,
        })),
    }));
};

export const splitCountToChartData = (splitCounts: SplitCountResult[]): ChartData[] =>
    splitCounts.map(({ currency, statusOffsetCounts, splitUnit }) => {
        const prepared = prepareOffsetCounts(statusOffsetCounts);
        return {
            currency,
            series: statusOffsetCountsToSeries(prepared, splitUnit),
        };
    });
