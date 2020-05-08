import { MapTuple } from '../../../../type-utils';
import { SearchService } from '../../../api-codegen/anapi/swagger-codegen';

export type InvoicesSearchParams = MapTuple<
    Parameters<SearchService['searchInvoices']>,
    {
        shopID?: 5;
        shopIDs?: 6;
        invoiceStatus?: 7;
        invoiceID?: 8;
        invoiceAmountFrom?: 9;
        invoiceAmountTo?: 10;
    }
>;
