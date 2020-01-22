import { FormGroup } from '@angular/forms';
import { Subscription, zip } from 'rxjs';
import { debounceTime, map, switchMap, first, shareReplay } from 'rxjs/operators';

import { QuestionaryData } from '../../../../api-codegen/questionary';
import { ValidityService } from '../validity';
import { QuestionaryStateService } from '../questionary-state.service';
import { FormValue } from './form-value';
import { StepName } from '../step-flow';

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
        return zip(this.questionaryStateService.questionaryData$, formValueChanges$)
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

    protected abstract toForm(data: QuestionaryData): FormGroup;

    protected abstract applyToQuestionaryData(data: QuestionaryData, formValue: FormValue): QuestionaryData;

    protected abstract getStepName(): StepName;
}
