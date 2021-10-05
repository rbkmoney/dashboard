import { InvoiceStatus } from '@dsh/api-codegen/anapi';

export interface AdditionalFilters {
    invoiceIDs?: string[];
    shopIDs?: string[];
    invoiceStatus?: InvoiceStatus.StatusEnum;
}
