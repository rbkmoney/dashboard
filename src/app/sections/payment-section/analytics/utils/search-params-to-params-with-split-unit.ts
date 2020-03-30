import { SplitCountResult, SplitUnit } from '../../../../api-codegen/anapi/swagger-codegen';
import { Period } from '../../../../form-controls/range-datepicker';
import { SearchParams } from '../search-params';
import { SearchParamsWithSplitUnit } from '../search-params-with-split-unit';
import SplitUnitEnum = SplitCountResult.SplitUnitEnum;

export function searchParamsToParamsWithSplitUnit({
    fromTime,
    toTime,
    period,
    shopIDs
}: SearchParams): SearchParamsWithSplitUnit {
    return {
        fromTime,
        toTime,
        splitUnit: periodToSplitUnit(period),
        shopIDs
    };
}

function periodToSplitUnit(period: Period): SplitUnit {
    console.log(period);
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
}
