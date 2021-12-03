import { PaymentInstitution } from '@dsh/api-codegen/capi';
import { TypeUnion } from '@dsh/app/shared/components/shop-creation/created-existing-switch/created-existing-switch.component';
import { ExistingBankAccountForm } from '@dsh/app/shared/components/shop-creation/existing-bank-account/existing-bank-account.component';
import { ShopDetailsForm } from '@dsh/app/shared/components/shop-creation/shop-details-form/shop-details-form.component';

import { ExistingContractForm } from '../../existing-contract-form/existing-contract-form.component';
import { InternationalBankAccountForm } from '../components';
import { ContractorForm } from './contractor-form';

export interface InternationalShopEntityFormValue {
    shopDetails: ShopDetailsForm;
    orgDetails: TypeUnion<ContractorForm, ExistingContractForm<'InternationalLegalEntity'>>;
    paymentInstitution: PaymentInstitution;
    bankAccount: TypeUnion<
        InternationalBankAccountForm,
        ExistingBankAccountForm<'PayoutToolDetailsInternationalBankAccount'>
    >;
}
