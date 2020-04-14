import { MapTuple } from '../../../../type-utils';
import { SearchService } from '../../../api-codegen/anapi/swagger-codegen';

export type PayoutsSearchParams = MapTuple<
    Parameters<SearchService['searchPayouts']>,
    {
        shopID?: 5;
        offset?: 6;
        payoutID?: 7;
        payoutToolType?: 8;
        excludedShops?: 9;
        continuationToken?: 10;
    }
>;
