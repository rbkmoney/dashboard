import { PaymentInstitution } from '@dsh/api-codegen/capi';
import { Preset } from '@dsh/components/filters/date-range-filter';

import { Filters } from '../analytics-search-filters/analytics-search-filters.component';
import { SearchParams } from '../search-params';

export const filtersToSearchParams = (
    { dateRange, ...otherParams }: Filters,
    realm: PaymentInstitution.RealmEnum
): SearchParams => {
    const { start, end } = dateRange;
    return {
        fromTime:
            dateRange.preset === Preset.Custom
                ? start.utc().format()
                : start.clone().endOf('d').add(1, 'ms').utc().format(),
        toTime: end.utc().format(),
        realm,
        ...otherParams,
    };
};
