import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class PdlInfoService {
    private pdlRelationDegreeVisible$ = new BehaviorSubject(false);

    constructor(private fb: FormBuilder) {}

    isPdlRelationDegreeVisible$ = this.pdlRelationDegreeVisible$;

    setPdlRelationDegreeVisible(isVisible: boolean) {
        this.pdlRelationDegreeVisible$.next(isVisible);
    }

    pdlRelationDegreeChange(form: FormGroup, checked: boolean) {
        this.pdlRelationDegreeVisible$.next(checked);
        form.setControl('pdlRelationDegree', this.fb.control('', checked ? Validators.required : null));
    }

    getForm(): FormGroup {
        return this.fb.group({
            pdlCategory: [false, Validators.required],
            pdlRelationDegree: ['']
        });
    }
}
