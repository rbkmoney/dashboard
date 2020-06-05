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

const indexToVisibility = (index: number, length: number): 'show' | 'hide' =>
    length > 24 ? (index % 2 ? 'hide' : 'show') : 'show';

const offsetToX = (offset: number, unit: SplitUnit, index: number, length: number): string =>
    `${moment(offset).format(splitUnitToTimeFormat(unit))}#${indexToVisibility(index, length)}`;

const statusOffsetCountsToSeries = (statusOffsetCounts: StatusOffsetCount[], unit: SplitUnit) => {
    return statusOffsetCounts.map(({ status, offsetCount }) => ({
        name: translate(`analytics.paymentStatuses.${status.toString()}`, null, 'payment-section|scoped'),
        data: offsetCount.map((c, i) => ({
            x: offsetToX(c.offset, unit, i, offsetCount.length),
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
