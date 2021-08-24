import { Shop } from '@dsh/api-codegen/capi';

import { ShopDetailsForm } from '../../shop-details-form/shop-details-form.component';
import { OrgDetailsForm } from '../components/org-details-form/org-details-form.component';
import { RussianBankAccountForm } from '../components/russian-bank-account/types/bank-account-form-data';
import { BankAccountType } from './bank-account-type';

export interface RussianShopEntity {
    shopDetails: ShopDetailsForm;
    orgDetails: OrgDetailsForm;
    bankAccountType: BankAccountType;
    newBankAccount: RussianBankAccountForm;
    bankShop: Shop;
}
