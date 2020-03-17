import { SearchService } from '../../../api-codegen/anapi/swagger-codegen';
import { MapTuple } from '../../../../type-utils';

export type InvoicesSearchParams = MapTuple<
    Parameters<SearchService['searchInvoices']>,
    {
        shopID?: 5;
        invoiceStatus?: 6;
        invoiceID?: 7;
        invoiceAmountFrom?: 8;
        invoiceAmountTo?: 9;
    }
>;
