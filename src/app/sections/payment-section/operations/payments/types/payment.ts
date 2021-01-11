import { Payer, PaymentError, PaymentSearchResult, PaymentToolDetails, TransactionInfo } from '@dsh/api-codegen/capi';

export interface Payment {
    id: string;
    amount: number;
    currency: string;
    status: PaymentSearchResult.StatusEnum;
    statusChangedAt: string;
    invoiceID: string;
    paymentID: string;
    shopID: string;
    shopName: string;
    fee: number;
    payer: Payer & { paymentToolDetails: PaymentToolDetails };
    transactionInfo?: TransactionInfo;
    externalID?: string;
    error?: PaymentError;
}
