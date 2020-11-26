import { MapTuple } from '../../../../type-utils';
import { SearchService } from '../../../api-codegen/anapi/swagger-codegen';

export type InvoicesSearchParams = MapTuple<
    Parameters<SearchService['searchInvoices']>,
    {
        shopID?: 6;
        shopIDs?: 7;
        paymentInstitutionRealm?: 8;
        invoiceIDs?: 9;
        invoiceStatus?: 10;
        invoiceID?: 11;
        externalID?: 12;
        invoiceAmountFrom?: 13;
        invoiceAmountTo?: 14;
        excludedShops?: 15;
    }
>;
