import { Wallet } from '@dsh/api-codegen/wallet-api';

import { DisplayWithFn, WalletId, WalletName } from '../types';

const toMap = (wallets: Wallet[]): Map<WalletId, WalletName> => {
    const result = new Map<WalletId, WalletName>();
    for (const { id, name } of wallets) {
        result.set(id, name);
    }
    return result;
};

export const walletsToDisplayWithFn = (wallets: Wallet[]): DisplayWithFn => {
    const map = toMap(wallets);
    return (walletId: WalletId): string => {
        const walletName = map.get(walletId);
        return walletName && `${walletId} - ${walletName}`;
    };
};
