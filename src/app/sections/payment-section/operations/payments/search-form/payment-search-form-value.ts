import {
    BankCardPaymentSystem,
    BankCardTokenProvider,
    PaymentStatus,
    PaymentTerminalProvider,
} from '@dsh/api-codegen/anapi/swagger-codegen';

import { SearchFormValue } from '../../../search-form-value';

export interface PaymentSearchFormValue extends SearchFormValue {
    shopIDs?: string[];
    paymentStatus?: PaymentStatus.StatusEnum;
    paymentFlow?: 'hold' | 'instant';
    paymentMethod?: 'bankCard' | 'paymentTerminal';
    paymentTerminalProvider?: PaymentTerminalProvider;
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
