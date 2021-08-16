import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@ngneat/reactive-forms';

import { alpha3CountryValidator } from '@dsh/utils';

import { InternationalBankAccountFormValue } from '../../types/international-bank-account-form-value';
import { payoutToolFormValidator } from './payout-tool-form-validator';

@Injectable()
export class InternationalPayoutToolFormService {
    constructor(private fb: FormBuilder) {}

    getForm(): FormGroup<InternationalBankAccountFormValue> {
        return this.fb.group(
            {
                number: ['', [Validators.pattern(/^[0-9A-Z]{8,40}$/)]],
                iban: ['', [Validators.pattern(/^[A-Z0-9]{14,35}$/)]],
                bic: ['', [Validators.pattern(/^([A-Z0-9]{8}|[A-Z0-9]{11})$/)]],
                abaRtn: ['', [Validators.pattern(/^[0-9]{9}$/)]],
                name: ['', [Validators.maxLength(100)]],
                country: ['', [alpha3CountryValidator]],
                address: ['', [Validators.maxLength(1000)]],
                currency: ['', [Validators.pattern(/^[A-Z]{3}$/)]],
            },
            { validator: payoutToolFormValidator }
        );
    }
}
