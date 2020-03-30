import { SplitCountResult, SplitUnit } from '../../../../api-codegen/anapi/swagger-codegen';
import { Period } from '../../../../form-controls/range-datepicker';
import { SearchParams } from '../search-params';
import { FormParams } from './form-params';
import SplitUnitEnum = SplitCountResult.SplitUnitEnum;

export function toSearchParams({ date, ...params }: FormParams): SearchParams {
    return {
        ...params,
        fromTime: date.begin.utc().toDate(),
        toTime: date.end.utc().toDate(),
        period: date.period
    };
}

function periodToSplitUnit(period: Period): SplitUnit {
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
