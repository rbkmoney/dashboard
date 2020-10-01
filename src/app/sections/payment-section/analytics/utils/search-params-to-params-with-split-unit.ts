import SplitUnitEnum = SplitCountResult.SplitUnitEnum;
import moment from 'moment';

import { SplitCountResult, SplitUnit } from '../../../../api-codegen/anapi/swagger-codegen';
import { SearchParams } from '../search-params';
import { SearchParamsWithSplitUnit } from '../search-params-with-split-unit';

export const searchParamsToParamsWithSplitUnit = ({
    fromTime,
    toTime,
    shopIDs,
}: SearchParams): SearchParamsWithSplitUnit => ({
    fromTime,
    toTime,
    splitUnit: periodToSplitUnit(fromTime, toTime),
    shopIDs,
});

const periodToSplitUnit = (fromTime: string, toTime: string): SplitUnit => {
    const daysCount = Math.abs(moment(fromTime).diff(toTime, 'd'));
    if (daysCount > 90) {
        return SplitUnitEnum.Month;
    }
    if (daysCount > 35) {
        return SplitUnitEnum.Week;
    }
    return SplitUnitEnum.Day;
};
