import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable()
export class AuthorityConfirmingDocumentService {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    static readonly CustomType = Symbol('custom');

    constructor(private fb: FormBuilder) {}

    getForm(): FormGroup {
        return this.fb.group({
            type: [null],
            customType: [null],
            date: [null],
            number: [''],
        });
    }
}
