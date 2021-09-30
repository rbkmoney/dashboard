import { FormControl, ValidatorFn } from '@ngneat/reactive-forms';
import isNil from 'lodash-es/isNil';

import { PaymentStatus } from '@dsh/api-codegen/anapi';

export const paymentStatusValidator: ValidatorFn = (control: FormControl<PaymentStatus.StatusEnum>) => {
    const value = control.value;
    const isValid = isNil(value) || Object.values(PaymentStatus.StatusEnum).includes(value);

    return isValid
        ? null
        : {
              invoiceStatus: true,
          };
};
