import {
    BankCardPaymentSystem,
    BankCardTokenProvider,
    PaymentStatus,
    PaymentTerminalProvider,
} from '@dsh/api-codegen/anapi/swagger-codegen';
import { PaymentInstitution } from '@dsh/api-codegen/capi';

import RealmEnum = PaymentInstitution.RealmEnum;

export interface PaymentSearchFormValue {
    realm: RealmEnum;
    fromTime: string;
    toTime: string;
    shopIDs?: string[];
    paymentStatus?: PaymentStatus.StatusEnum;
    paymentFlow?: 'hold' | 'instant';
    paymentMethod?: 'bankCard' | 'paymentTerminal';
    paymentTerminalProvider?: PaymentTerminalProvider;
    invoiceIDs?: string[];
    invoiceID?: string;
    paymentID?: string;
    payerEmail?: string;
    payerIP?: string;
    payerFingerprint?: string;
    customerID?: string;
    first6?: string;
    last4?: string;
    bankCardTokenProvider?: BankCardTokenProvider;
    bankCardPaymentSystem?: BankCardPaymentSystem;
    paymentAmount?: number;
    rrn?: string;
    paymentAmountFrom?: number;
    paymentAmountTo?: number;
}
