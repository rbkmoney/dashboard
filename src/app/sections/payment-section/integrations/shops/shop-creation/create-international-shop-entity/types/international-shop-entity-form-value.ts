import { InternationalBankAccountFormValue } from './international-bank-account-form-value';

export interface InternationalShopEntityFormValue {
    shopUrl: string;
    shopName: string;
    organizationName: string;
    tradingName: string;
    registeredAddress: string;
    actualAddress: string;
    country: string;
    payoutTool: InternationalBankAccountFormValue;
    correspondentPayoutTool?: InternationalBankAccountFormValue;
}
