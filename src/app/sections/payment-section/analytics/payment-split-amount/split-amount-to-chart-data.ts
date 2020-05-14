import moment from 'moment';

import { toMajor } from '../../../../../utils';
import { OffsetAmount, SplitAmountResult, SplitUnit } from '../../../../api-codegen/anapi/swagger-codegen';
import { ChartData, Series, splitUnitToTimeFormat } from '../utils';

const offsetAmountsToSeries = (offsetAmounts: OffsetAmount[], unit: SplitUnit): Series[] => [
    {
        data: offsetAmounts.map(offsetAmount => ({
            x: moment(offsetAmount.offset).format(splitUnitToTimeFormat(unit)),
            y: toMajor(offsetAmount.amount)
        }))
    }
];

export const splitAmountToChartData = (paymentsSplitAmount: Array<SplitAmountResult>): ChartData[] =>
    paymentsSplitAmount.map(({ currency, offsetAmounts, splitUnit }) => ({
        currency,
        series: offsetAmountsToSeries(offsetAmounts, splitUnit)
    }));
