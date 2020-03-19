import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { issuerCodeValidator, seriesNumberValidator } from '../../../../../../form-controls';

@Injectable()
export class RussianDomesticPassportService {
    constructor(private fb: FormBuilder) {}

    getForm(): FormGroup {
        return this.fb.group({
            seriesNumber: ['', [Validators.required, seriesNumberValidator]],
            issuer: ['', Validators.required],
            issuerCode: ['', [Validators.required, issuerCodeValidator]],
            issuedAt: [null, Validators.required]
        });
    }
}
