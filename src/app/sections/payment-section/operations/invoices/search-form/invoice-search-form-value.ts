import {
    BankCardPaymentSystem,
    BankCardTokenProvider,
    PaymentStatus,
    PaymentTerminalProvider
} from '../../../../../api-codegen/anapi/swagger-codegen';
import { SearchFormValue } from '../../search-form-value';
import { Invoice } from '../../../../../api-codegen/anapi/swagger-codegen';

export interface InvoiceSearchFormValue extends SearchFormValue {
    invoiceStatus?: Invoice.StatusEnum;
    invoiceAmount?: number;
    shopID?: string;
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
