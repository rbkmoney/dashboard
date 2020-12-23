import { Payer, PaymentError, PaymentSearchResult, PaymentToolDetails, TransactionInfo } from '@dsh/api-codegen/capi';

export interface Payment {
    amount: number;
    currency: string;
    status: PaymentSearchResult.StatusEnum;
    statusChangedAt: string;
    invoiceID: string;
    shopName: string;
    paymentID: string;
    fee: number;
    payer: Payer & { paymentToolDetails: PaymentToolDetails };
    transactionInfo?: TransactionInfo;
    externalID?: string;
    error?: PaymentError;
}
