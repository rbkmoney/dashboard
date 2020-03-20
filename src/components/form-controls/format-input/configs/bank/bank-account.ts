import { TextMaskConfig } from 'angular2-text-mask';

import { maskToValidator } from '../../../utils';
import { FormatInputConfig } from '../format-input-config';

const BANK_ACCOUNT_LENGTH = 20;

export const bankAccountMask: TextMaskConfig = {
    mask: new Array(BANK_ACCOUNT_LENGTH).fill(/\d/),
    guide: false
};

export const bankAccountValidator = maskToValidator(bankAccountMask);

export const bankAccountConfig: FormatInputConfig = {
    mask: bankAccountMask,
    placeholder: '0'.repeat(BANK_ACCOUNT_LENGTH)
};
