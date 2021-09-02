import { DistributionSearchParams } from '../distribution-search-params';
import { SearchParams } from '../search-params';

export const searchParamsToDistributionSearchParams = ({
    fromTime,
    toTime,
    shopIDs,
    realm,
}: SearchParams): DistributionSearchParams => ({
    fromTime,
    toTime,
    shopIDs,
    realm,
});
