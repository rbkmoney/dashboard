import { MapTuple } from '../../../../type-utils';
import { SearchService } from '../../../api-codegen/anapi/swagger-codegen';

export type PaymentsSearchParams = MapTuple<
    Parameters<SearchService['searchPayments']>,
    {
        shopID?: 5;
        shopIDs?: 6;
        paymentStatus?: 7;
        paymentFlow?: 8;
        paymentMethod?: 9;
        paymentTerminalProvider?: 10;
        invoiceID?: 11;
        paymentID?: 12;
        payerEmail?: 13;
        payerIP?: 14;
        payerFingerprint?: 15;
        customerID?: 16;
        first6?: 17;
        last4?: 18;
        rrn?: 19;
        approvalCode?: 20;
        bankCardTokenProvider?: 21;
        bankCardPaymentSystem?: 22;
        paymentAmountFrom?: 23;
        paymentAmountTo?: 24;
    }
>;
