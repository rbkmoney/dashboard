import sortBy from 'lodash.sortby';
import moment from 'moment';

import { toMajor } from '../../../../../utils';
import { OffsetAmount, SplitAmountResult, SplitUnit } from '../../../../api-codegen/anapi/swagger-codegen';
import { ChartData, Series, splitUnitToTimeFormat } from '../utils';

const fixExtraInterval = (offsetAmounts: OffsetAmount[]): OffsetAmount[] =>
    offsetAmounts.reduce(
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

const prepareOffsetAmounts = (offsetAmounts: OffsetAmount[], unit: SplitUnit): OffsetAmount[] => {
    const sorted = sortBy(offsetAmounts, 'offset');
    return unit !== 'hour' ? fixExtraInterval(sorted) : sorted;
};

const offsetAmountsToSeries = (offsetAmounts: OffsetAmount[], unit: SplitUnit): Series[] => [
    {
        data: offsetAmounts.map(offsetAmount => ({
            x: moment(offsetAmount.offset).format(splitUnitToTimeFormat(unit)),
            y: toMajor(offsetAmount.amount)
        }))
    }
];

export const splitAmountToChartData = (paymentsSplitAmount: Array<SplitAmountResult>): ChartData[] =>
    paymentsSplitAmount.map(({ currency, offsetAmounts, splitUnit }) => {
        const prepared = prepareOffsetAmounts(offsetAmounts, splitUnit);
        return {
            currency,
            series: offsetAmountsToSeries(prepared, splitUnit)
        };
    });
