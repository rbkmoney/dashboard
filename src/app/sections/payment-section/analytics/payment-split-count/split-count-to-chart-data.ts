import { translate } from '@ngneat/transloco';
import sortBy from 'lodash.sortby';
import moment from 'moment';

import {
    OffsetCount,
    SplitCountResult,
    SplitUnit,
    StatusOffsetCount
} from '../../../../api-codegen/anapi/swagger-codegen';
import { ChartData, splitUnitToTimeFormat } from '../utils';

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

const prepareOffsetCounts = (statusOffsetCounts: StatusOffsetCount[], unit: SplitUnit): StatusOffsetCount[] =>
    statusOffsetCounts.map(
        (statusOffsetCount): StatusOffsetCount => {
            const sorted = sortBy(statusOffsetCount.offsetCount, 'offset');
            return {
                ...statusOffsetCount,
                offsetCount: unit !== 'hour' ? fixExtraInterval(sorted) : sorted
            };
        }
    );

const getOffsetSortedArray = (offset: StatusOffsetCount[]): number[] => {
    const offsetsArrays = offset.map(o => o.offsetCount.map(c => c.offset));
    const allOffsets = offsetsArrays.reduce((acc, curr) => acc.concat(curr), []);
    const distinctOffsets = [...new Set(allOffsets)];
    return sortBy(distinctOffsets);
};

const fillOffset = (offset: StatusOffsetCount[]): StatusOffsetCount[] => {
    const offsetArray: number[] = getOffsetSortedArray(offset);
    return offset.map(({ status, offsetCount }) => ({
        status,
        offsetCount: offsetArray.map((o, i) => ({ offset: o, count: offsetCount[i]?.count ?? 0 }))
    }));
};

const statusOffsetCountsToSeries = (statusOffsetCounts: StatusOffsetCount[], unit: SplitUnit) => {
    const filledOffset = fillOffset(statusOffsetCounts);
    return filledOffset.map(({ status, offsetCount }) => ({
        name: translate(`analytics.paymentStatuses.${status.toString()}`, null, 'payment-section|scoped'),
        data: offsetCount.map(c => ({
            x: moment(c.offset).format(splitUnitToTimeFormat(unit)),
            y: c.count
        }))
    }));
};

export const splitCountToChartData = (splitCounts: SplitCountResult[]): ChartData[] =>
    splitCounts.map(({ currency, statusOffsetCounts, splitUnit }) => {
        const prepared = prepareOffsetCounts(statusOffsetCounts, splitUnit);
        return {
            currency,
            series: statusOffsetCountsToSeries(prepared, splitUnit)
        };
    });
