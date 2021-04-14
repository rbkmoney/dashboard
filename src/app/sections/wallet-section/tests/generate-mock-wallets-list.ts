import { Wallet } from '@dsh/api-codegen/wallet-api';

import { generateMockWallet } from './generate-mock-wallet';

export const generateMockWalletsList = (length: number): Wallet[] =>
    Array.from({ length }, (_, index) => generateMockWallet(index + 1));
