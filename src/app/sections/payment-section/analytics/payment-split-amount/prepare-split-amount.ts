import sortBy from 'lodash.sortby';

import { OffsetAmount, SplitAmountResult, SplitUnit } from '../../../../api-codegen/anapi/swagger-codegen';
import { getOffsets } from '../utils';

const fixExtraInterval = (offsetAmounts: OffsetAmount[]): OffsetAmount[] =>
    sortBy(offsetAmounts, 'offset').reduce(
        (acc, curr, index) =>
            index === 1
                ? [
                      {
                          ...curr,
                          amount: acc[0].amount + curr.amount
                      }
                  ]
                : [...acc, curr],
        []
    );

const fillSplitAmountByZeroValues = (
    offsetAmounts: OffsetAmount[],
    fromTime: string,
    toTime: string,
    splitUnit: SplitUnit
): OffsetAmount[] => {
    const offsets = getOffsets(fromTime, toTime, splitUnit);
    return offsets.map(offset => {
        const fixedOffsetAmount = splitUnit !== 'hour' ? fixExtraInterval(offsetAmounts) : offsetAmounts;
        return {
            offset,
            amount: fixedOffsetAmount[fixedOffsetAmount.findIndex(o => o.offset === offset)]?.amount || 0
        };
    });
};

export const prepareSplitAmount = (
    splitAmounts: SplitAmountResult[],
    fromTime: string,
    toTime: string
): SplitAmountResult[] =>
    splitAmounts.map(({ splitUnit, currency, offsetAmounts }) => ({
        splitUnit,
        currency,
        offsetAmounts: fillSplitAmountByZeroValues(offsetAmounts, fromTime, toTime, splitUnit)
    }));
