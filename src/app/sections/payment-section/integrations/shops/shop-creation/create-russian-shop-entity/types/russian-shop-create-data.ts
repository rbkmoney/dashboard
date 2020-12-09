import { BankAccount, Contract } from '@dsh/api-codegen/capi';

export interface RussianShopCreateData {
    url: string;
    name: string;
    contract: Contract;
    payoutToolID: string | null;
    bankAccount: BankAccount;
}
