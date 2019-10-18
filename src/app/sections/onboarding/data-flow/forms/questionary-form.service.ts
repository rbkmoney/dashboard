import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription, combineLatest } from 'rxjs';
import { debounceTime, first, map } from 'rxjs/operators';

import { QuestionaryData } from '../../../../api-codegen/questionary';
import { ValidityService } from '../validity.service';
import { QuestionaryStateService } from '../questionary-state.service';
import { FormValue } from './form-value';

export abstract class QuestionaryFormService {
    form: FormGroup = this.getForm();

    private data$ = this.questionarySateService.questionaryData$.pipe(first());

    constructor(
        protected fb: FormBuilder,
        protected questionarySateService: QuestionaryStateService,
        protected validityService: ValidityService
    ) {}

    initFormValue(): Subscription {
        return this.data$.pipe(map(d => this.toFormValue(d))).subscribe(v => this.form.patchValue(v));
    }

    startFormValuePersistent(debounceMs = 1000): Subscription {
        return combineLatest(this.data$, this.form.valueChanges)
            .pipe(
                debounceTime(debounceMs),
                map(([d, v]) => {
                    try {
                        return this.applyToQuestionaryData(d, v);
                    } catch (err) {
                        console.error(err);
                        return d;
                    }
                })
            )
            .subscribe(d => this.questionarySateService.add(d));
    }

    startFormValidityReporting(debounceMs = 300): Subscription {
        return this.form.statusChanges
            .pipe(
                debounceTime(debounceMs),
                map(v => v === 'VALID')
            )
            .subscribe(isValid => this.validityService.setUpValidity(isValid));
    }

    protected abstract getForm(): FormGroup;

    protected abstract toFormValue(data: QuestionaryData): FormValue;

    protected abstract applyToQuestionaryData(data: QuestionaryData, formValue: FormValue): QuestionaryData;
}
