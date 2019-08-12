import { Moment } from 'moment';

import {
    BankCardPaymentSystem,
    BankCardTokenProvider,
    InvoiceStatus,
    PaymentFlow,
    PaymentMethod,
    PaymentStatus,
    PaymentTerminalProvider
} from '../api/capi/swagger-codegen';

export interface InvoiceSearchParams {
    fromTime: Moment;
    toTime: Moment;
    limit: number;
    shopID?: string;
    invoiceStatus?: InvoiceStatus.StatusEnum;
    paymentStatus?: PaymentStatus.StatusEnum;
    paymentFlow?: PaymentFlow.TypeEnum;
    paymentMethod?: PaymentMethod.MethodEnum;
    paymentTerminalProvider?: PaymentTerminalProvider;
    invoiceID?: string;
    paymentID?: string;
    payerEmail?: string;
    payerIP?: string;
    payerFingerprint?: string;
    customerID?: string;
    bankCardTokenProvider?: BankCardTokenProvider;
    bankCardPaymentSystem?: BankCardPaymentSystem;
    first6?: string;
    last4?: string;
    paymentAmount?: number;
    invoiceAmount?: number;
    excludedShops?: string[];
    continuationToken?: string;
}
