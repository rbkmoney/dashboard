import { BankAccount, Category, Contract } from '@dsh/api-codegen/capi';

export interface RussianShopCreateData {
    url: string;
    name: string;
    category: Category;
    contract: Contract;
    payoutToolID: string | null;
    bankAccount: BankAccount;
}
