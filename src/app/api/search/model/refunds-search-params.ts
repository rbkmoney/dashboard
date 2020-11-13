import { MapTuple } from '../../../../type-utils';
import { SearchService } from '../../../api-codegen/anapi/swagger-codegen';

export type RefundsSearchParams = MapTuple<
    Parameters<SearchService['searchRefunds']>,
    {
        shopID?: 6;
        shopIDs?: 7;
        paymentInstitutionRealm?: 8;
        invoiceID?: 10;
        paymentID?: 11;
        refundID?: 12;
        externalID?: 13;
        refundStatus?: 14;
        excludedShops?: 15;
    }
>;
