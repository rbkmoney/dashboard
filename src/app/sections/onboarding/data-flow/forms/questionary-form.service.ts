import { FormGroup } from '@angular/forms';
import { forkJoin, of, Subscription } from 'rxjs';
import { debounceTime, first, map, shareReplay, startWith, switchMap } from 'rxjs/operators';

import { QuestionaryData } from '../../../../api-codegen/questionary';
import { QuestionaryStateService } from '../questionary-state.service';
import { StepName } from '../step-flow';
import { ValidationCheckService } from '../validation-check';
import { ValidityService } from '../validity';
import { FormValue } from './form-value';

export abstract class QuestionaryFormService {
    readonly form$ = this.questionaryStateService.questionaryData$.pipe(
        first(),
        map((data) => this.toForm(data)),
        shareReplay(1)
    );
    readonly stepName: StepName = this.getStepName();

    constructor(
        protected questionaryStateService: QuestionaryStateService,
        protected validityService: ValidityService,
        protected validationCheckService: ValidationCheckService
    ) {}

    startFormValuePersistent(debounceMs = 300): Subscription {
        const formValueChanges$ = this.form$.pipe(switchMap((form) => form.valueChanges));
        const data$ = this.questionaryStateService.questionaryData$.pipe(first());
        return formValueChanges$
            .pipe(
                debounceTime(debounceMs),
                switchMap((v) => forkJoin([of(v), data$]))
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
                switchMap((form) =>
                    form.statusChanges.pipe(
                        startWith(form.status),
                        map(() => form.valid)
                    )
                ),
                debounceTime(debounceMs)
            )
            .subscribe((isValid) => this.validityService.setUpValidity(this.stepName, isValid));
    }

    startFormControlsValidationCheck() {
        return this.form$.subscribe((control) => this.validationCheckService.setUpFormControl(this.stepName, control));
    }

    protected abstract toForm(data: QuestionaryData): FormGroup;

    protected abstract applyToQuestionaryData(data: QuestionaryData, formValue: FormValue): QuestionaryData;

    protected abstract getStepName(): StepName;
}
