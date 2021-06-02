import { FormGroup } from '@ngneat/reactive-forms';
import { ControlsValue } from '@ngneat/reactive-forms/lib/types';

import { HoldExpiration } from '../../../services/create-payment-link/types/hold-expiration';
import { ORDERED_PAYMENT_METHODS_NAMES } from '../../../services/create-payment-link/types/ordered-payment-methods-names';

export type PaymentMethodControls = { [N in typeof ORDERED_PAYMENT_METHODS_NAMES[number]]: boolean };

export type Controls = {
    name: string;
    description: string;
    email: string;
    redirectUrl: string;
    paymentMethods: FormGroup<PaymentMethodControls>;
    paymentFlowHold: boolean;
    holdExpiration?: HoldExpiration;
};

export const EMPTY_VALUE: ControlsValue<Controls> = {
    name: '',
    description: '',
    email: '',
    redirectUrl: '',
    paymentMethods: Object.fromEntries(
        ORDERED_PAYMENT_METHODS_NAMES.map((name) => [name, name === 'bankCard'])
    ) as ControlsValue<Controls>['paymentMethods'],
    paymentFlowHold: false,
    holdExpiration: HoldExpiration.Cancel,
};
