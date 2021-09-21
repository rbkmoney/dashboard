import { PaymentInstitution } from '@dsh/api-codegen/capi';
import { TypeUnion } from '@dsh/app/shared/components/shop-creation/created-existing-switch/created-existing-switch.component';
import { ExistingBankAccountForm } from '@dsh/app/shared/components/shop-creation/existing-bank-account/existing-bank-account.component';

import { ShopDetailsForm } from '../../shop-details-form/shop-details-form.component';
import { OrgDetailsForm } from '../components/org-details-form/org-details-form.component';
import { RussianBankAccountForm } from '../components/russian-bank-account-form/types/bank-account-form-data';

export interface RussianShopForm {
    shopDetails: ShopDetailsForm;
    orgDetails: OrgDetailsForm;
    paymentInstitution: PaymentInstitution;
    bankAccount: TypeUnion<RussianBankAccountForm, ExistingBankAccountForm<'PayoutToolDetailsBankAccount'>>;
}
