import { FormGroup } from '@ngneat/reactive-forms';

import { HoldExpiration } from '@dsh/app/shared/components/create-payment-link/types/hold-expiration';
import { ORDERED_PAYMENT_METHODS_NAMES } from '@dsh/app/shared/components/create-payment-link/types/ordered-payment-methods-names';

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
