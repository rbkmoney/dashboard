import { FormControl, ValidatorFn } from '@ngneat/reactive-forms';

import { DEPOSIT_STATUSES_LIST } from '../consts';
import { DepositStatusFilterValue } from '../types/deposit-status-filter-value';

export const depositStatusValidator: ValidatorFn = (control: FormControl<DepositStatusFilterValue>) => {
    const value = control.value;
    const isValid = value === null || value === undefined || DEPOSIT_STATUSES_LIST.includes(value);

    return isValid
        ? null
        : {
              depositStatus: true,
          };
};
