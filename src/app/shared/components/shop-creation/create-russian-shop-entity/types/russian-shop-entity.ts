import { Shop } from '@dsh/api-codegen/capi';

import { ShopDetailsForm } from '../../shop-details-form/shop-details-form.component';
import { OrgDetailsForm } from './../components/shop-contract/shop-contract.component';
import { BankAccountFormData } from './bank-account-form-data';
import { BankAccountType } from './bank-account-type';

export interface RussianShopEntity {
    shopDetails: ShopDetailsForm;
    orgDetails: OrgDetailsForm;
    bankAccountType: BankAccountType;
    newBankAccount: BankAccountFormData;
    bankShop: Shop;
}
