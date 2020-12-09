import { RefundSearchResult } from '@dsh/api-codegen/capi/swagger-codegen';

export interface SearchFiltersParams {
    fromTime: string;
    toTime: string;
    invoiceIDs: string[];
    shopIDs: string[];
    refundStatus: RefundSearchResult.StatusEnum;
}
