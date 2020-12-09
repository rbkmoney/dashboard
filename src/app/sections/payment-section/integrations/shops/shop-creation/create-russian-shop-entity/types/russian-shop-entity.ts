import { Contract } from '@dsh/api-codegen/capi';

import { BankAccountFormData } from './bank-account-form-data';
import { BankAccountType } from './bank-account-type';

export interface RussianShopEntity {
    url: string;
    name: string;
    bankAccountType: BankAccountType;
    newBankAccount: BankAccountFormData;
    bankShopID: string;
    contract: Contract;
}
