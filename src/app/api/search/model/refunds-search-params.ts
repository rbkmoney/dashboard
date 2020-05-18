import { MapTuple } from '../../../../type-utils';
import { SearchService } from '../../../api-codegen/anapi/swagger-codegen';

export type RefundsSearchParams = MapTuple<
    Parameters<SearchService['searchRefunds']>,
    {
        shopIDs?: 6;
        invoiceID?: 8;
        paymentID?: 9;
        refundID?: 10;
        refundStatus?: 11;
    }
>;
