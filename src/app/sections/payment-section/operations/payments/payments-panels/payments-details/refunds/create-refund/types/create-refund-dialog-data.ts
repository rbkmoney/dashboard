export interface CreateRefundDialogData {
    shopID: string;
    invoiceID: string;
    paymentID: string;
    currency: string;
    maxRefundAmount: number;
}
