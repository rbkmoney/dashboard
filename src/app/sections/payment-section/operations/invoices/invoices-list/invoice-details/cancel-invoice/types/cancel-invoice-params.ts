import { Reason } from '@dsh/api-codegen/capi';

export interface CancelInvoiceParams {
    invoiceID: string;
    reason: Reason;
}
