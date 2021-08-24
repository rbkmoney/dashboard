import { Shop } from '@dsh/api-codegen/capi';

import { ShopDetailsForm } from '../../shop-details-form/shop-details-form.component';
import { RussianBankAccountForm } from '../components/russian-bank-account/types/bank-account-form-data';
import { OrgDetailsForm } from './../components/shop-contract/shop-contract.component';
import { BankAccountType } from './bank-account-type';

export interface RussianShopEntity {
    shopDetails: ShopDetailsForm;
    orgDetails: OrgDetailsForm;
    bankAccountType: BankAccountType;
    newBankAccount: RussianBankAccountForm;
    bankShop: Shop;
}
