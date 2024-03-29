import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class IndividualResidencyInfoService {
    constructor(private fb: FormBuilder) {}

    getForm(): FormGroup {
        return this.fb.group({
            usaTaxResident: [false, Validators.required],
            exceptUsaTaxResident: [false, Validators.required],
        });
    }
}
