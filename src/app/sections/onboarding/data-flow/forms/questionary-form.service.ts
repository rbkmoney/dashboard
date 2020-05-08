import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { combineLatest, forkJoin, of, Subscription } from 'rxjs';
import { debounceTime, first, map, pluck, shareReplay, startWith, switchMap, take } from 'rxjs/operators';

import { QuestionaryData } from '../../../../api-codegen/questionary';
import { QuestionaryStateService } from '../questionary-state.service';
import { StepName } from '../step-flow';
import { ValidityService } from '../validity';
import { FormValue } from './form-value';

function hasChildrenControls(control: AbstractControl): control is FormGroup | FormArray {
    return !!(control as any).controls;
}

function validateControl(form: FormGroup | FormArray) {
    Object.values(form.controls).forEach(control => {
        control.markAsTouched();
        control.markAsDirty();
        control.updateValueAndValidity();
        if (hasChildrenControls(control)) {
            validateControl(control);
        }
    });
}

export abstract class QuestionaryFormService {
    readonly form$ = this.questionaryStateService.questionaryData$.pipe(
        first(),
        map(data => this.toForm(data)),
        shareReplay(1)
    );
    readonly stepName: StepName = this.getStepName();

    constructor(
        protected questionaryStateService: QuestionaryStateService,
        protected validityService: ValidityService
    ) {}

    startFormValuePersistent(debounceMs = 300): Subscription {
        const formValueChanges$ = this.form$.pipe(switchMap(form => form.valueChanges));
        const data$ = this.questionaryStateService.questionaryData$.pipe(first());
        return formValueChanges$
            .pipe(
                debounceTime(debounceMs),
                switchMap(v => forkJoin([of(v), data$]))
            )
            .subscribe(([v, data]) => {
                try {
                    const questionaryData = this.applyToQuestionaryData(data, v);
                    return this.questionaryStateService.add(questionaryData);
                } catch (err) {
                    console.error(err);
                }
            });
    }

    startFormValidityReporting(debounceMs = 300): Subscription {
        return this.form$
            .pipe(
                switchMap(form => combineLatest([of(form), form.statusChanges.pipe(startWith(form.status))])),
                pluck(0, 'valid'),
                debounceTime(debounceMs)
            )
            .subscribe(isValid =>
                this.validityService.setUpValidity(this.stepName, { isValid, validate: this.validate.bind(this) })
            );
    }

    validate() {
        this.form$.pipe(take(1)).subscribe(validateControl);
    }

    protected abstract toForm(data: QuestionaryData): FormGroup;

    protected abstract applyToQuestionaryData(data: QuestionaryData, formValue: FormValue): QuestionaryData;

    protected abstract getStepName(): StepName;
}
