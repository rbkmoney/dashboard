import SplitUnitEnum = SplitCountResult.SplitUnitEnum;
import moment from 'moment';

import { Period } from '@dsh/components/form-controls';

import { SplitCountResult, SplitUnit } from '../../../../api-codegen/anapi/swagger-codegen';
import { SearchParams } from '../search-params';
import { SearchParamsWithSplitUnit } from '../search-params-with-split-unit';

export const searchParamsToParamsWithSplitUnit = ({
    fromTime,
    toTime,
    period,
    shopIDs,
}: SearchParams): SearchParamsWithSplitUnit => ({
    fromTime,
    toTime,
    splitUnit: periodToSplitUnit(period, fromTime, toTime),
    shopIDs,
});

const periodToSplitUnit = (period: Period, fromTime: string, toTime: string): SplitUnit => {
    if (period) {
        switch (period) {
            case 'day':
                return SplitUnitEnum.Hour;
            case 'week':
            case 'month':
                return SplitUnitEnum.Day;
            case '3month':
            case 'year':
                return SplitUnitEnum.Month;
        }
    } else {
        const daysCount = Math.abs(moment(fromTime).diff(toTime, 'd'));
        switch (true) {
            case daysCount > 90:
                return SplitUnitEnum.Month;
            case daysCount > 35:
                return SplitUnitEnum.Week;
            default:
                return SplitUnitEnum.Day;
        }
    }
};
