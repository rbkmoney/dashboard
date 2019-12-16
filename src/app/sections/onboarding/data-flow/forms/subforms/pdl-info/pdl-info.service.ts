import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import isEmpty from 'lodash/isEmpty';

import { FormValue } from '../../form-value';

@Injectable()
export class PdlInfoService {
    private pdlRelationDegreeVisible$ = new BehaviorSubject(false);

    isPdlRelationDegreeVisible$ = this.pdlRelationDegreeVisible$.asObservable();

    constructor(private fb: FormBuilder) {}

    applyFormValue({ pdlRelationDegree }: FormValue) {
        this.pdlRelationDegreeVisible$.next(!isEmpty(pdlRelationDegree));
    }

    pdlRelationDegreeChange(form: FormGroup, checked: boolean) {
        this.pdlRelationDegreeVisible$.next(checked);
        form.setControl('pdlRelationDegree', this.fb.control('', checked ? Validators.required : null));
    }

    getForm(): FormGroup {
        return this.fb.group({
            pdlCategory: [false],
            pdlRelationDegree: ['']
        });
    }
}
