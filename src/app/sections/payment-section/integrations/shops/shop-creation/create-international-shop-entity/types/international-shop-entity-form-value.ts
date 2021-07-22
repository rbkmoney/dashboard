import { Category, PaymentInstitution } from '@dsh/api-codegen/capi';

import { InternationalBankAccountFormValue } from './international-bank-account-form-value';

export interface InternationalShopEntityFormValue {
    shopUrl: string;
    shopName: string;
    category: Category;
    organizationName: string;
    tradingName: string;
    registeredAddress: string;
    actualAddress: string;
    country: string;
    paymentInstitution: PaymentInstitution;
    payoutTool: InternationalBankAccountFormValue;
    correspondentPayoutTool?: InternationalBankAccountFormValue;
}
