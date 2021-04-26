import { BANK_ACCOUNT_CONFIG } from './bank-account';
import { BANK_POST_ACCOUNT_CONFIG } from './bank-post-account';
import { BIK_CONFIG } from './bik';

export * from './bik';
export * from './bank-account';
export * from './bank-post-account';

export const BANK_CONFIGS = {
    bik: BIK_CONFIG,
    bankAccount: BANK_ACCOUNT_CONFIG,
    bankPostAccount: BANK_POST_ACCOUNT_CONFIG,
};
