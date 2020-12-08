import sortBy from 'lodash.sortby';
import moment from 'moment';

import { OffsetCount, SplitCountResult, SplitUnit, StatusOffsetCount } from '@dsh/api-codegen/anapi/swagger-codegen';

import { getOffsets } from '../utils';

const statuses: StatusOffsetCount.StatusEnum[] = ['captured', 'cancelled', 'failed'];

const fixExtraInterval = (offsetCounts: OffsetCount[]): OffsetCount[] =>
    sortBy(offsetCounts, 'offset').reduce(
        (acc, curr, index) =>
            index === 1
                ? [
                      {
                          ...curr,
                          count: acc[0].count + curr.count,
                      },
                  ]
                : [...acc, curr],
        []
    );

const fillSplitCountByZeroValues = (
    offsetCounts: OffsetCount[],
    fromTime: string,
    toTime: string,
    splitUnit: SplitUnit
): OffsetCount[] => {
    const offsets = getOffsets(fromTime, toTime, splitUnit);
    if (offsetCounts) {
        const fixedOffsetCount =
            splitUnit !== 'hour' && moment(fromTime).valueOf() === offsets[0]
                ? fixExtraInterval(offsetCounts)
                : offsetCounts;
        return offsets.map((offset) => {
            return {
                offset,
                count: fixedOffsetCount.find((o) => o.offset === offset)?.count || 0,
            };
        });
    } else {
        return offsets.map((offset) => ({ offset, count: 0 }));
    }
};

export const prepareSplitCount = (
    splitCounts: SplitCountResult[],
    fromTime: string,
    toTime: string
): SplitCountResult[] =>
    splitCounts.map(({ splitUnit, currency, statusOffsetCounts }) => ({
        splitUnit,
        currency,
        statusOffsetCounts: statuses.map((status) => ({
            status,
            offsetCount: fillSplitCountByZeroValues(
                statusOffsetCounts.find((o) => o.status === status)?.offsetCount,
                fromTime,
                toTime,
                splitUnit
            ),
        })),
    }));
