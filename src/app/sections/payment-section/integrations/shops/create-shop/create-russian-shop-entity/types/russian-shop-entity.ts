import { BankAccount } from '../../../../../../../api-codegen/capi/swagger-codegen';
import { BankAccountType } from './bank-account-type';

export interface RussianShopEntity {
    url: string;
    name: string;
    bankAccountType: BankAccountType;
    newBankAccount: BankAccount;
    shop: string;
}
