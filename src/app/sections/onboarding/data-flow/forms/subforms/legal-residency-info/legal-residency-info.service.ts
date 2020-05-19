import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class LegalResidencyInfoService {
    constructor(private fb: FormBuilder) {}

    getForm(): FormGroup {
        return this.fb.group({
            taxResident: [false, Validators.required],
            fatca: [false, Validators.required],
        });
    }
}
