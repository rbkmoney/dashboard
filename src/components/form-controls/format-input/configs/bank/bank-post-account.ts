import { TextMaskConfig } from 'angular2-text-mask';

import { maskToValidator } from '../../../utils';
import { FormatInputConfig } from '../format-input-config';

const BANK_POST_ACCOUNT_LENGTH = 20;

export const bankPostAccountMask: TextMaskConfig = {
    mask: new Array(BANK_POST_ACCOUNT_LENGTH).fill(/\d/),
    guide: false
};

export const bankPostAccountValidator = maskToValidator(bankPostAccountMask);

export const bankPostAccountConfig: FormatInputConfig = {
    mask: bankPostAccountMask,
    placeholder: '0'.repeat(BANK_POST_ACCOUNT_LENGTH)
};
