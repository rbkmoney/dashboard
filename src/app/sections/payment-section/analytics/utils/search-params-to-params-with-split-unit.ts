import SplitUnitEnum = SplitCountResult.SplitUnitEnum;
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
    splitUnit: periodToSplitUnit(period),
    shopIDs,
});

const periodToSplitUnit = (period: Period): SplitUnit => {
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
};
