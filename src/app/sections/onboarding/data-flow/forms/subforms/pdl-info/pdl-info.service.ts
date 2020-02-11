import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Injectable()
export class PdlInfoService {
    constructor(private fb: FormBuilder) {}

    getForm(): FormGroup {
        return this.fb.group({
            pdlCategory: [false],
            pdlRelationDegree: ['']
        });
    }
}
