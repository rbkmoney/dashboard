import { Reason } from '@dsh/api-codegen/capi';

export interface FulfillInvoiceParams {
    invoiceID: string;
    reason: Reason;
}
