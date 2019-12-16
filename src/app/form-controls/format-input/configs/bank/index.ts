import { bikConfig } from './bik';
import { bankAccountConfig } from './bank-account';
import { bankPostAccountConfig } from './bank-post-account';

export * from './bik';
export * from './bank-account';
export * from './bank-post-account';

export const bankConfigs = {
    bik: bikConfig,
    bankAccount: bankAccountConfig,
    bankPostAccount: bankPostAccountConfig
};
