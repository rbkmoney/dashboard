import {
    BankCardPaymentSystem,
    BankCardTokenProvider,
    PaymentStatus,
    PaymentTerminalProvider
} from '../../../../../api/capi/swagger-codegen';
import { SearchFormValue } from '../../search-form-value';

export interface PaymentSearchFormValue extends SearchFormValue {
    shopID?: string;
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
    rnn?: string;
}
