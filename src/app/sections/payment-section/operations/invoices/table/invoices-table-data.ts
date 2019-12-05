import { InvoiceStatus } from '../../../../../api-codegen/anapi';

export interface InvoicesTableData {
    amount: number;
    currency: string;
    status: InvoiceStatus.StatusEnum;
    createdAt: string;
    invoiceID: string;
    shopName: string;
}
