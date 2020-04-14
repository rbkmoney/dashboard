import { MapTuple } from '../../../../type-utils';
import { SearchService } from '../../../api-codegen/anapi/swagger-codegen';

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
