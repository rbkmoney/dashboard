import { FormGroup } from '@angular/forms';
import { forkJoin, of, Subscription } from 'rxjs';
import { debounceTime, first, map, shareReplay, switchMap } from 'rxjs/operators';

import { QuestionaryData } from '../../../../api-codegen/questionary';
import { QuestionaryStateService } from '../questionary-state.service';
import { StepName } from '../step-flow';
import { ValidityService } from '../validity';
import { FormValue } from './form-value';

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

    initForm(): Subscription {
        return this.form$.subscribe(form => this.validityService.setUpValidity(this.stepName, form.valid));
    }

    startFormValuePersistent(debounceMs = 300): Subscription {
        const formValueChanges$ = this.form$.pipe(switchMap(form => form.valueChanges));
        const data$ = this.questionaryStateService.questionaryData$.pipe(first());
        return formValueChanges$
            .pipe(
                debounceTime(debounceMs),
                switchMap(v => forkJoin(of(v), data$))
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
                switchMap(form => form.statusChanges),
                debounceTime(debounceMs),
                map(v => v === 'VALID')
            )
            .subscribe(isValid => this.validityService.setUpValidity(this.stepName, isValid));
    }

    protected abstract toForm(data: QuestionaryData): FormGroup;

    protected abstract applyToQuestionaryData(data: QuestionaryData, formValue: FormValue): QuestionaryData;

    protected abstract getStepName(): StepName;
}
