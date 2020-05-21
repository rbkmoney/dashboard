import { binConfig } from './bin';
import { lastDigitsConfig } from './last-digits';

export * from './bin';
export * from './last-digits';

export const bankCardConfigs = {
    bin: binConfig,
    lastDigits: lastDigitsConfig,
};
