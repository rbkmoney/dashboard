import { SearchService } from '../../../api-codegen/anapi/swagger-codegen';
import { MapTuple } from '../../../../type-utils';

export type PaymentsSearchParams = MapTuple<
    Parameters<SearchService['searchPayments']>,
    {
        shopID?: 5;
        paymentStatus?: 6;
        paymentFlow?: 7;
        paymentMethod?: 8;
        paymentTerminalProvider?: 9;
        invoiceID?: 10;
        paymentID?: 11;
        payerEmail?: 12;
        payerIP?: 13;
        payerFingerprint?: 14;
        customerID?: 15;
        first6?: 16;
        last4?: 17;
        rrn?: 18;
        approvalCode?: 19;
        bankCardTokenProvider?: 20;
        bankCardPaymentSystem?: 21;
        paymentAmountFrom?: 22;
        paymentAmountTo?: 23;
    }
>;
