import sortBy from 'lodash.sortby';

import { OffsetCount, SplitCountResult, SplitUnit } from '../../../../api-codegen/anapi/swagger-codegen';
import { getOffsets } from '../utils';

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
    return offsets.map((offset) => {
        const fixedOffsetCount = splitUnit !== 'hour' ? fixExtraInterval(offsetCounts) : offsetCounts;
        return {
            offset,
            count: fixedOffsetCount[fixedOffsetCount.findIndex((o) => o.offset === offset)]?.count || 0,
        };
    });
};

export const prepareSplitCount = (
    splitCounts: SplitCountResult[],
    fromTime: string,
    toTime: string
): SplitCountResult[] =>
    splitCounts.map(({ splitUnit, currency, statusOffsetCounts }) => ({
        splitUnit,
        currency,
        statusOffsetCounts: statusOffsetCounts.map(({ status, offsetCount }) => ({
            status,
            offsetCount: fillSplitCountByZeroValues(offsetCount, fromTime, toTime, splitUnit),
        })),
    }));
