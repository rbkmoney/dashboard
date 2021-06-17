import { Wallet } from '@dsh/api-codegen/wallet-api';

export type WalletId = Wallet['id'];
export type WalletName = Wallet['name'];
export type DisplayWithFn = (value: WalletId) => string;
