import { PaymentInstitution, RefundSearchResult } from '@dsh/api-codegen/capi/swagger-codegen';

import RealmEnum = PaymentInstitution.RealmEnum;

export interface SearchFiltersParams {
    realm: RealmEnum;
    fromTime: string;
    toTime: string;
    invoiceIDs?: string[];
    shopIDs?: string[];
    refundStatus?: RefundSearchResult.StatusEnum;
}
