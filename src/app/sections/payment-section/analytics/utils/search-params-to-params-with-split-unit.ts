import moment from 'moment';

import { SplitCountResult, SplitUnit } from '@dsh/api-codegen/anapi/swagger-codegen';

import { SearchParams } from '../search-params';
import { SearchParamsWithSplitUnit } from '../search-params-with-split-unit';

import SplitUnitEnum = SplitCountResult.SplitUnitEnum;

export const searchParamsToParamsWithSplitUnit = ({
    fromTime,
    toTime,
    shopIDs,
    realm,
}: SearchParams): SearchParamsWithSplitUnit => ({
    fromTime,
    toTime,
    splitUnit: calculateSplitUnit(fromTime, toTime),
    shopIDs,
    realm,
});

const calculateSplitUnit = (fromTime: string, toTime: string): SplitUnit => {
    const daysCount = Math.abs(moment(fromTime).diff(toTime, 'd'));
    if (daysCount > 90) {
        return SplitUnitEnum.Month;
    }
    if (daysCount > 35) {
        return SplitUnitEnum.Week;
    }
    if (daysCount > 1) {
        return SplitUnitEnum.Day;
    }
    return SplitUnitEnum.Hour;
};
