import { MapTuple } from '../../../../type-utils';
import { SearchService } from '../../../api-codegen/anapi/swagger-codegen';

export type InvoicesSearchParams = MapTuple<
    Parameters<SearchService['searchInvoices']>,
    {
        shopID?: 6;
        shopIDs?: 7;
        paymentInstitutionRealm?: 8;
        invoiceStatus?: 9;
        invoiceID?: 10;
        externalID?: 11;
        invoiceAmountFrom?: 12;
        invoiceAmountTo?: 13;
        excludedShops?: 14;
    }
>;
