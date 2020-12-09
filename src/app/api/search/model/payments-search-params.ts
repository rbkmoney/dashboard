import { SearchService } from '@dsh/api-codegen/anapi';

import { MapTuple } from '../../../../type-utils';

export type PaymentsSearchParams = MapTuple<
    Parameters<SearchService['searchPayments']>,
    {
        shopID?: 6;
        shopIDs?: 7;
        paymentInstitutionRealm?: 8;
        invoiceIDs?: 9;
        paymentStatus?: 10;
        paymentFlow?: 11;
        paymentMethod?: 12;
        paymentTerminalProvider?: 13;
        invoiceID?: 14;
        paymentID?: 15;
        externalID?: 16;
        payerEmail?: 17;
        payerIP?: 18;
        payerFingerprint?: 19;
        customerID?: 20;
        first6?: 21;
        last4?: 22;
        rrn?: 23;
        approvalCode?: 24;
        bankCardTokenProvider?: 25;
        bankCardPaymentSystem?: 26;
        paymentAmountFrom?: 27;
        paymentAmountTo?: 28;
        excludedShops?: 29;
    }
>;
