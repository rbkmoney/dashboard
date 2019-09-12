import { PaymentSearchResult } from '../../../../../api-codegen/capi';

export interface PaymentsTableData {
    amount: number;
    currency: string;
    status: PaymentSearchResult.StatusEnum;
    statusChangedAt: string;
    invoiceID: string;
    shopName: string;
    paymentID: string;
}
