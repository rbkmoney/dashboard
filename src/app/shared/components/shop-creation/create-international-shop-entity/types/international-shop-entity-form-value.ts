import { PaymentInstitution } from '@dsh/api-codegen/capi';
import { ShopDetailsForm } from '@dsh/app/shared/components/shop-creation/shop-details-form/shop-details-form.component';

import { InternationalBankAccountFormValue } from './international-bank-account-form-value';

export interface InternationalShopEntityFormValue {
    shopDetails: ShopDetailsForm;
    organizationName: string;
    tradingName: string;
    registeredAddress: string;
    actualAddress: string;
    country: string;
    paymentInstitution: PaymentInstitution;
    payoutTool: InternationalBankAccountFormValue;
    correspondentPayoutTool?: InternationalBankAccountFormValue;
}
