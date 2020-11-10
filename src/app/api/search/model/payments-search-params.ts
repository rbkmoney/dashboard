import { MapTuple } from '../../../../type-utils';
import { SearchService } from '../../../api-codegen/anapi/swagger-codegen';

export type PaymentsSearchParams = MapTuple<
    Parameters<SearchService['searchPayments']>,
    {
        shopID?: 6;
        shopIDs?: 7;
        paymentInstitutionRealm?: 8;
        paymentStatus?: 9;
        paymentFlow?: 10;
        paymentMethod?: 11;
        paymentTerminalProvider?: 12;
        invoiceID?: 13;
        paymentID?: 14;
        externalID?: 15;
        payerEmail?: 16;
        payerIP?: 17;
        payerFingerprint?: 18;
        customerID?: 19;
        first6?: 20;
        last4?: 21;
        rrn?: 22;
        approvalCode?: 23;
        bankCardTokenProvider?: 24;
        bankCardPaymentSystem?: 25;
        paymentAmountFrom?: 26;
        paymentAmountTo?: 27;
    }
>;
