import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { individualEntityInnValidator, snilsValidator } from '@dsh/components/form-controls';

@Injectable()
export class PrivateEntityInfoService {
    constructor(private fb: FormBuilder) {}

    getForm(): FormGroup {
        return this.fb.group({
            fio: ['', Validators.required],
            birthDate: [null, Validators.required],
            birthPlace: ['', Validators.required],
            residenceAddress: ['', Validators.required],
            snils: ['', [Validators.required, snilsValidator]],
            innfl: ['', individualEntityInnValidator]
        });
    }
}
