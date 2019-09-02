import { SearchService } from '../../api-codegen/capi/swagger-codegen';

type params = Parameters<SearchService['searchInvoices']>;

export interface InvoicesSearchParams {
    shopID?: params[5];
    invoiceStatus?: params[6];
    paymentStatus?: params[7];
    paymentFlow?: params[8];
    paymentMethod?: params[9];
    paymentTerminalProvider?: params[10];
    invoiceID?: params[11];
    paymentID?: params[12];
    payerEmail?: params[13];
    payerIP?: params[14];
    payerFingerprint?: params[15];
    customerID?: params[16];
    bankCardTokenProvider?: params[17];
    bankCardPaymentSystem?: params[18];
    first6?: params[19];
    last4?: params[20];
    paymentAmount?: params[21];
    invoiceAmount?: params[22];
    excludedShops?: params[23];
}
