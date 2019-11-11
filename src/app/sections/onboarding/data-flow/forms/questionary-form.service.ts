import { FormGroup } from '@angular/forms';
import { Subscription, combineLatest, AsyncSubject } from 'rxjs';
import { debounceTime, first, map, switchMap } from 'rxjs/operators';

import { QuestionaryData } from '../../../../api-codegen/questionary';
import { ValidityService } from '../validity';
import { QuestionaryStateService } from '../questionary-state.service';
import { FormValue } from './form-value';
import { StepName } from '../step-flow';

export abstract class QuestionaryFormService {
    readonly form$ = new AsyncSubject<FormGroup>();
    readonly stepName: StepName = this.getStepName();

    private data$ = this.questionaryStateService.questionaryData$.pipe(first());

    constructor(
        protected questionaryStateService: QuestionaryStateService,
        protected validityService: ValidityService
    ) {}

    initFormValue(): Subscription {
        return combineLatest(this.data$.pipe(map(d => this.toFormValue(d))), this.form$).subscribe(([v, form]) =>
            form.patchValue(v)
        );
    }

    startFormValuePersistent(debounceMs = 1000): Subscription {
        return combineLatest(this.data$, this.form$.pipe(switchMap(form => form.valueChanges))) // TODO this.data$ is actual?
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
            .subscribe(d => this.questionaryStateService.add(d));
    }

    startFormValidityReporting(debounceMs = 300): Subscription {
        return this.form$
            .pipe(
                switchMap(form => form.statusChanges),
                debounceTime(debounceMs),
                map(v => v === 'VALID')
            )
            .subscribe(isValid => this.validityService.setUpValidity(this.stepName, isValid));
    }

    protected abstract toFormValue(data: QuestionaryData): FormValue;

    protected abstract applyToQuestionaryData(data: QuestionaryData, formValue: FormValue): QuestionaryData;

    protected abstract getStepName(): StepName;
}
