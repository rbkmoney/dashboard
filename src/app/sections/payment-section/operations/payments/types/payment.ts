import { Payer, PaymentSearchResult, PaymentToolDetails } from '@dsh/api-codegen/capi';

export interface Payment extends PaymentSearchResult {
    externalID: string;
    payer: Payer & { paymentToolDetails: PaymentToolDetails };
}
