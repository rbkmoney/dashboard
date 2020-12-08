import { SearchService } from '@dsh/api-codegen/anapi';

import { MapTuple } from '../../../../type-utils';

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
