import { Wallet } from '@dsh/api-codegen/wallet-api';

import { generateMockWalletId } from './generate-mock-wallet-id';

export function generateMockWallet(order: number): Wallet {
    return {
        id: generateMockWalletId(order),
        name: 'Mock wallet name',
        createdAt: new Date('21.04.2020, 12:23:56'),
        isBlocked: false,
        identity: 'test',
        currency: 'RUB',
        externalID: 'test',
    };
}
