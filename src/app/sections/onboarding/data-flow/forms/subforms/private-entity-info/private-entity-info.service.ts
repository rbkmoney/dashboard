import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { snilsValidator, individualEntityInnValidator } from '../../../../../../form-controls';

@Injectable()
export class PrivateEntityInfoService {
    constructor(private fb: FormBuilder) {}

    getForm(): FormGroup {
        return this.fb.group({
            fio: ['', Validators.required], // TODO need to backend implementation
            birthDate: ['', Validators.required],
            birthPlace: ['', Validators.required],
            residenceAddress: ['', Validators.required],
            snils: ['', [Validators.required, snilsValidator]],
            innfl: ['', individualEntityInnValidator]
        });
    }
}
