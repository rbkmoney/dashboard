import { PaymentInstitution, PayoutTool } from '@dsh/api-codegen/capi';

import { ShopDetailsForm } from '../../shop-details-form/shop-details-form.component';
import { OrgDetailsForm } from '../components/org-details-form/org-details-form.component';
import { RussianBankAccountForm } from '../components/russian-bank-account-form/types/bank-account-form-data';
import { BankAccountType } from './bank-account-type';

export interface RussianShopForm {
    bankAccountType: BankAccountType;
    shopDetails: ShopDetailsForm;
    orgDetails: OrgDetailsForm;
    paymentInstitution: PaymentInstitution;
    bankAccount?: RussianBankAccountForm;
    payoutTool?: PayoutTool;
}
