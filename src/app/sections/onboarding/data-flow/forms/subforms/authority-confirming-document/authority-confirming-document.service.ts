import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import * as moment from 'moment';

import { FormValue } from '../../form-value';

const documentTypes = ['solePartyDecision', 'meetingOfShareholders', 'meetingOfParticipants'];
const customDocumentType = 'custom';

@Injectable()
export class AuthorityConfirmingDocumentService {
    private customDocumentInfoVisible$ = new BehaviorSubject(false);
    private selectedOption$ = new BehaviorSubject('');

    readonly selectOptionTypes = documentTypes.concat(customDocumentType);
    isCustomDocumentInfoVisible$: Observable<boolean> = this.customDocumentInfoVisible$.asObservable();
    selectValue$: Observable<string> = this.selectedOption$.asObservable();

    constructor(private fb: FormBuilder) {}

    applyFormValue({ type }: FormValue) {
        const isKnownType = documentTypes.includes(type);
        this.selectedOption$.next(isKnownType ? type : customDocumentType);
        this.customDocumentInfoVisible$.next(!isKnownType);
    }

    documentTypeSelectionChange(form: FormGroup, value: string) {
        const isCustomType = value === customDocumentType;
        this.customDocumentInfoVisible$.next(isCustomType);
        form.patchValue({
            type: isCustomType ? '' : value,
            number: ''
        });
        form.setControl(
            'date',
            this.fb.control(
                moment()
                    .utc()
                    .format(),
                isCustomType ? Validators.required : null
            )
        );
    }

    getForm(): FormGroup {
        return this.fb.group({
            type: ['', Validators.required],
            date: [
                moment()
                    .utc()
                    .format()
            ],
            number: ['']
        });
    }
}
