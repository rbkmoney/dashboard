import { FormControl, ValidatorFn } from '@ngneat/reactive-forms';

import { isNil } from '@dsh/utils';

import { PAYMENT_STATUSES_LIST } from '../consts';
import { PaymentStatusFilterValue } from '../types/payment-status-filter-value';

export const paymentStatusValidator: ValidatorFn = (control: FormControl<PaymentStatusFilterValue>) => {
    const value = control.value;
    const isValid = isNil(value) || PAYMENT_STATUSES_LIST.includes(value);

    return isValid
        ? null
        : {
              paymentStatus: true,
          };
};
