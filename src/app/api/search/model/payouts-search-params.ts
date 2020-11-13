import { MapTuple } from '../../../../type-utils';
import { SearchService } from '../../../api-codegen/anapi/swagger-codegen';

export type PayoutsSearchParams = MapTuple<
    Parameters<SearchService['searchPayouts']>,
    {
        shopID?: 6;
        shopIDs?: 7;
        paymentInstitutionRealm?: 8;
        offset?: 9;
        payoutID?: 10;
        payoutToolType?: 11;
        excludedShops?: 12;
        continuationToken?: 13;
    }
>;
