import { Contract, Shop } from '@dsh/api-codegen/capi';

import { ShopDetailsForm } from '../../shop-details-form/shop-details-form.component';
import { BankAccountFormData } from './bank-account-form-data';
import { BankAccountType } from './bank-account-type';

export interface RussianShopEntity {
    shopDetails: ShopDetailsForm;
    bankAccountType: BankAccountType;
    newBankAccount: BankAccountFormData;
    bankShop: Shop;
    contract: Contract;
}
