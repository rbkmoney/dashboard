import { DistributionSearchParams } from '../distribution-search-params';
import { SearchParams } from '../search-params';

export const searchParamsToDistributionSearchParams = ({
    fromTime,
    toTime,
    shopIDs,
}: SearchParams): DistributionSearchParams => ({
    fromTime,
    toTime,
    shopIDs,
});
