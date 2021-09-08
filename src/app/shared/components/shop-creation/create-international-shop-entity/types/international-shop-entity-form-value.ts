import { PaymentInstitution } from '@dsh/api-codegen/capi';
import { TypeUnion } from '@dsh/app/shared/components/shop-creation/created-existing-switch/created-existing-switch.component';
import { ShopDetailsForm } from '@dsh/app/shared/components/shop-creation/shop-details-form/shop-details-form.component';

import { ExistingContractForm } from '../../existing-contract-form/existing-contract-form.component';
import { NewContractorForm } from '../components/new-contractor-form/new-contractor-form.component';
import { InternationalBankAccountFormValue } from './international-bank-account-form-value';

export interface InternationalShopEntityFormValue {
    shopDetails: ShopDetailsForm;
    orgDetails: TypeUnion<NewContractorForm, ExistingContractForm<'InternationalLegalEntity'>>;
    paymentInstitution: PaymentInstitution;
    payoutTool: InternationalBankAccountFormValue;
    correspondentPayoutTool?: InternationalBankAccountFormValue;
}
