import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, first, map, tap } from 'rxjs/operators';

import { QuestionaryData } from '../../../api-codegen/questionary';
import { ValidityService } from './validity.service';
import { QuestionaryService } from './questionary.service';

export abstract class QuestionaryFormService {
    form: FormGroup = this.getForm();

    constructor(
        protected fb: FormBuilder,
        protected questionaryService: QuestionaryService,
        protected validityService: ValidityService
    ) {}

    initFormValue(): Subscription {
        return this.questionaryService.questionaryData$
            .pipe(
                first(),
                map(d => this.toFormValue(d)),
                tap(d => console.log('initFormValue', d))
            )
            .subscribe(v => this.form.patchValue(v));
    }

    startFormValuePersistent(debounceMs = 1000): Subscription {
        return this.form.valueChanges
            .pipe(
                debounceTime(debounceMs),
                map(v => this.toQuestionaryData(v)),
                tap(d => console.log('startFormValuePersistent', d))
            )
            .subscribe(d => this.questionaryService.add(d));
    }

    startFormValidityReporting(debounceMs = 300): Subscription {
        return this.form.statusChanges
            .pipe(
                debounceTime(debounceMs),
                map(v => v === 'VALID'),
                tap(isValid => console.log('startFormValidityReporting', isValid))
            )
            .subscribe(isValid => this.validityService.setUpValidity(isValid));
    }

    protected abstract getForm(): FormGroup;

    protected abstract toFormValue(
        data: QuestionaryData
    ): {
        [key: string]: any;
    };

    protected abstract toQuestionaryData(formValue: { [key: string]: any }): QuestionaryData;
}
