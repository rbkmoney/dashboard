import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';

import { seriesNumberValidator, issuerCodeValidator } from '../../../../../../form-controls';

@Injectable()
export class RussianDomesticPassportService {
    constructor(private fb: FormBuilder) {}

    getForm(): FormGroup {
        return this.fb.group({
            seriesNumber: ['', [Validators.required, seriesNumberValidator]],
            issuer: ['', Validators.required],
            issuerCode: ['', [Validators.required, issuerCodeValidator]],
            issuedAt: [
                moment()
                    .utc()
                    .format(),
                Validators.required
            ]
        });
    }
}
