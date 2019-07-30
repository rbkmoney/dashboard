export interface PaymentsSearchParams {
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
    first6?: string;
    last4?: string;
    rrn?: string;
    approvalCode?: string;
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
}
