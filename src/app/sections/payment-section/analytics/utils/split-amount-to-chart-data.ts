import sortBy from 'lodash.sortby';
import moment from 'moment';

import { OffsetAmount, SplitAmountResult } from '../../../../api-codegen/anapi/swagger-codegen';
import { ChartData } from './chart-data';

const sortByOffset = (offsetAmounts: OffsetAmount[]): OffsetAmount[] => sortBy(offsetAmounts, o => o.offset);

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

const prepareOffsetAmounts = (offsetAmounts: OffsetAmount[]): OffsetAmount[] => {
    const sorted = sortByOffset(offsetAmounts);
    return fixExtraInterval(sorted);
};

const offsetAmountsToData = (offsetAmounts: OffsetAmount[]): number[] =>
    offsetAmounts.map(offsetAmount => offsetAmount.amount);

const offsetAmountsToTimes = (offsetAmounts: OffsetAmount[]): string[] =>
    offsetAmounts.map(offsetAmount => moment(offsetAmount.offset).format());

export const splitAmountToChartData = (paymentsSplitAmount: Array<SplitAmountResult>): ChartData[] =>
    paymentsSplitAmount.map(({ currency, offsetAmounts }) => {
        const prepared = prepareOffsetAmounts(offsetAmounts);
        return {
            currency,
            series: [
                {
                    data: offsetAmountsToData(prepared)
                }
            ],
            times: offsetAmountsToTimes(prepared)
        };
    });
