import { SearchService } from '../api/capi/swagger-codegen';

type params = Parameters<SearchService['searchPayments']>;

export interface PaymentsSearchParams {
    xRequestID?: params[0];
    fromTime?: string;
    toTime?: string;
    limit?: params[3];
    xRequestDeadline?: params[4];
    shopID?: params[5];
    paymentStatus?: params[6];
    paymentFlow?: params[7];
    paymentMethod?: params[8];
    paymentTerminalProvider?: params[9];
    invoiceID?: params[10];
    paymentID?: params[11];
    payerEmail?: params[12];
    payerIP?: params[13];
    payerFingerprint?: params[14];
    customerID?: params[15];
    first6?: params[16];
    last4?: params[17];
    rrn?: params[18];
    approvalCode?: params[19];
    bankCardTokenProvider?: params[20];
    bankCardPaymentSystem?: params[21];
    paymentAmount?: params[22];
    excludedShops?:params[23]
    continuationToken?: params[24];
}
