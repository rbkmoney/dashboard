import { RefundSearchResult } from '../../../../../api-codegen/capi/swagger-codegen';

export interface RefundsTableData {
    amount: number;
    currency: string;
    status: RefundSearchResult.StatusEnum;
    createdAt: string;
    invoiceID: string;
    paymentID: string;
    reason: string;
}
