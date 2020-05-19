import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable()
export class AuthorityConfirmingDocumentService {
    static readonly CustomType = Symbol('custom');

    constructor(private fb: FormBuilder) {}

    getForm(): FormGroup {
        return this.fb.group({
            type: [null],
            customType: [null],
            date: [null],
            number: ['']
        });
    }
}
