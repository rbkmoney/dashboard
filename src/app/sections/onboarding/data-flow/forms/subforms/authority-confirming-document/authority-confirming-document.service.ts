import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class AuthorityConfirmingDocumentService {
    constructor(private fb: FormBuilder) {}

    getForm(): FormGroup {
        return this.fb.group({
            type: ['', Validators.required],
            date: [null],
            number: ['']
        });
    }
}
