import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AuthorityConfirmingDocumentService {
    private customDocumentInfoVisible$ = new BehaviorSubject(false);

    isCustomDocumentInfoVisible$: Observable<boolean> = this.customDocumentInfoVisible$.asObservable();

    constructor(private fb: FormBuilder) {}

    setCustomDocumentInfoVisible(isVisible: boolean) {
        this.customDocumentInfoVisible$.next(isVisible);
    }

    authorityConfirmingDocumentTypeSelectionChange(form: FormGroup, value: string) {
        const isCustomType = value === 'custom';
        this.customDocumentInfoVisible$.next(isCustomType);
        form.patchValue({
            type: isCustomType ? '' : value
        });
        form.setControl('date', this.fb.control('', isCustomType ? Validators.required : null));
    }

    getForm(): FormGroup {
        return this.fb.group({
            type: ['', Validators.required],
            date: ['2019-09-30T21:00:00Z'], // TODO fix it
            number: ['']
        });
    }
}
