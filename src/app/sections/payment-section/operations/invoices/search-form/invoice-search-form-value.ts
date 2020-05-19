import {
    BankCardPaymentSystem,
    BankCardTokenProvider,
    Invoice,
    PaymentStatus,
    PaymentTerminalProvider
} from '../../../../../api-codegen/anapi/swagger-codegen';
import { SearchFormValue } from '../../../search-form-value';

export interface InvoiceSearchFormValue extends SearchFormValue {
    invoiceStatus?: Invoice.StatusEnum;
    invoiceAmount?: number;
    shopIDs?: string[];
    paymentStatus?: PaymentStatus.StatusEnum;
    paymentFlow?: 'instant' | 'hold';
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
}
