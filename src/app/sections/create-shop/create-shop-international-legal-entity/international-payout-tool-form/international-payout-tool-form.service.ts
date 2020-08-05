import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { countryCodeValidator } from './country-code-validator';
import { formValidator } from './form-valildator';

@Injectable()
export class InternationalPayoutToolFormService {
    constructor(private fb: FormBuilder) {}

    getForm(): FormGroup {
        return this.fb.group(
            {
                number: ['', [Validators.pattern(/^[0-9A-Z]{8,40}$/)]],
                iban: ['', [Validators.pattern(/^[A-Z0-9]{14,35}$/)]],
                bic: ['', [Validators.pattern(/^([A-Z0-9]{8}|[A-Z0-9]{11})$/)]],
                abaRtn: ['', [Validators.pattern(/^[0-9]{9}$/)]],
                name: ['', [Validators.maxLength(100)]],
                countryCode: ['', [Validators.pattern(/^[A-Z]{3}$/), countryCodeValidator]],
                address: ['', [Validators.maxLength(1000)]],
            },
            { validators: formValidator }
        );
    }
}
