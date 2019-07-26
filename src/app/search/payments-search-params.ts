export interface PaymentsSearchParams {
    xRequestID: string;
    fromTime: Date;
    toTime: Date;
    limit: number;
    xRequestDeadline?: string;
    shopID?: string;
    paymentStatus?: 'pending' | 'processed' | 'captured' | 'cancelled' | 'refunded' | 'failed';
    paymentFlow?: 'instant' | 'hold';
    paymentMethod?: 'bankCard' | 'paymentTerminal';
    paymentTerminalProvider?: 'euroset';
    invoiceID?: string;
    paymentID?: string;
    payerEmail?: string;
    payerIP?: string;
    payerFingerprint?: string;
    customerID?: string;
    bin?: string;
    lastDigits?: string;
    bankCardTokenProvider?: 'applepay' | 'googlepay' | 'samsungpay';
    bankCardPaymentSystem?:
        | 'visa'
        | 'mastercard'
        | 'visaelectron'
        | 'maestro'
        | 'forbrugsforeningen'
        | 'dankort'
        | 'amex'
        | 'dinersclub'
        | 'discover'
        | 'unionpay'
        | 'jcb'
        | 'nspkmir';
    paymentAmount?: number;
    continuationToken?: string;
    observe?: 'body';
    reportProgress?: boolean;
}
