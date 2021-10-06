import { RefundStatus } from '@dsh/api-codegen/anapi';

export interface AdditionalFilters {
    invoiceIDs?: string[];
    shopIDs?: string[];
    refundStatus?: RefundStatus.StatusEnum;
}
