import sortBy from 'lodash.sortby';
import moment from 'moment';
import { ApexAxisChartSeries } from 'ng-apexcharts';

import { OffsetAmount, SplitAmountResult } from '../../../../api-codegen/anapi/swagger-codegen';
import { ChartData } from '../utils';

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
    const sorted = sortBy(offsetAmounts, 'offset');
    return fixExtraInterval(sorted);
};

const offsetAmountsToSeries = (offsetAmounts: OffsetAmount[]): ApexAxisChartSeries => [
    {
        data: offsetAmounts.map(offsetAmount => offsetAmount.amount)
    }
];

const offsetAmountsToTimes = (offsetAmounts: OffsetAmount[]): string[] =>
    offsetAmounts.map(offsetAmount => moment(offsetAmount.offset).format());

export const splitAmountToChartData = (paymentsSplitAmount: Array<SplitAmountResult>): ChartData[] =>
    paymentsSplitAmount.map(({ currency, offsetAmounts }) => {
        const prepared = prepareOffsetAmounts(offsetAmounts);
        return {
            currency,
            series: offsetAmountsToSeries(prepared),
            times: offsetAmountsToTimes(prepared)
        };
    });
