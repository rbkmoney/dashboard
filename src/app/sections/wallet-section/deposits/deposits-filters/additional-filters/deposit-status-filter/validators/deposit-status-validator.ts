import { FormControl, ValidatorFn } from '@ngneat/reactive-forms';

import { isNil } from '@dsh/utils';

import { DEPOSIT_STATUSES_LIST } from '../consts';
import { DepositStatusFilterValue } from '../types/deposit-status-filter-value';

export const depositStatusValidator: ValidatorFn = (control: FormControl<DepositStatusFilterValue>) => {
    const value = control.value;
    const isValid = isNil(value) || DEPOSIT_STATUSES_LIST.includes(value);

    return isValid
        ? null
        : {
              depositStatus: true,
          };
};
