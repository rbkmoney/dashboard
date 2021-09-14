import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@ngneat/reactive-forms';

import { createValidatedAbstractControlProviders, ValidatedWrappedAbstractControlSuperclass } from '@dsh/utils';

import { payoutToolFormValidator } from './utils/payout-tool-form-validator';

export interface PayoutToolForm {
    number: string;
    iban: string;
    abaRtn: string;
    address: string;
    bic: string;
    name: string;
    country: string;
}

@Component({
    selector: 'dsh-payout-tool-form',
    templateUrl: 'payout-tool-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createValidatedAbstractControlProviders(PayoutToolFormComponent),
})
export class PayoutToolFormComponent extends ValidatedWrappedAbstractControlSuperclass<PayoutToolForm> {
    formControl = this.fb.group<PayoutToolForm>(
        {
            number: ['', [Validators.pattern(/^[0-9A-Z]{8,40}$/)]],
            iban: ['', [Validators.pattern(/^[A-Z0-9]{14,35}$/)]],
            bic: ['', [Validators.pattern(/^([A-Z0-9]{8}|[A-Z0-9]{11})$/)]],
            abaRtn: ['', [Validators.pattern(/^[0-9]{9}$/)]],
            name: ['', [Validators.maxLength(100)]],
            country: '',
            address: ['', [Validators.maxLength(1000)]],
        },
        { validator: payoutToolFormValidator }
    );

    constructor(injector: Injector, private fb: FormBuilder) {
        super(injector);
    }
}
