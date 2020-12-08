import { SearchService } from '@dsh/api-codegen/anapi';

import { MapTuple } from '../../../../type-utils';

export type RefundsSearchParams = MapTuple<
    Parameters<SearchService['searchRefunds']>,
    {
        shopID?: 6;
        shopIDs?: 7;
        paymentInstitutionRealm?: 8;
        invoiceIDs?: 10;
        invoiceID?: 11;
        paymentID?: 12;
        refundID?: 13;
        externalID?: 14;
        refundStatus?: 15;
        excludedShops?: 16;
    }
>;
