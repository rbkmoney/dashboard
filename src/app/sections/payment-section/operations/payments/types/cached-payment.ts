import { PaymentSearchResult } from '@dsh/api-codegen/anapi';

export interface CachedPayment {
    payment: PaymentSearchResult;
    listIndex: number;
}
