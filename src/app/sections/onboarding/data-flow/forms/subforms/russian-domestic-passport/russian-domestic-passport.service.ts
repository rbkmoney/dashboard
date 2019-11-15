import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';

@Injectable()
export class RussianDomesticPassportService {
    constructor(private fb: FormBuilder) {}

    getForm(): FormGroup {
        return this.fb.group({
            seriesNumber: ['', Validators.required],
            issuer: ['', Validators.required],
            issuerCode: ['', Validators.required],
            issuedAt: [
                moment()
                    .utc()
                    .format(),
                Validators.required
            ]
        });
    }
}
