import { MapTuple } from '../../../../type-utils';
import { SearchService } from '../../../api-codegen/anapi/swagger-codegen';

export type RefundSearchParams = MapTuple<
    Parameters<SearchService['searchRefunds']>,
    {
        shopID?: 5;
        shopIDs?: 6;
        invoiceID?: 8;
        paymentID?: 9;
        refundID?: 10;
        refundStatus?: 11;
    }
>;
