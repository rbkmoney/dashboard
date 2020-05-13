import { MapTuple } from '../../../../type-utils';
import { SearchService } from '../../../api-codegen/anapi/swagger-codegen';

export type PayoutsSearchParams = MapTuple<
    Parameters<SearchService['searchPayouts']>,
    {
        shopIDs?: 6;
        offset?: 7;
        payoutID?: 8;
        payoutToolType?: 9;
        excludedShops?: 10;
        continuationToken?: 11;
    }
>;
