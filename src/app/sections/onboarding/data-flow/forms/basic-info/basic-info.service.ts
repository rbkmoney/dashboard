import { Injectable } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { QuestionaryStateService } from '../../questionary-state.service';
import { ValidityService } from '../../validity';
import { QuestionaryData } from '../../../../../api-codegen/questionary';
import { QuestionaryFormService } from '../questionary-form.service';
import { applyToQuestionaryData } from './apply-to-questionary-data';
import { FormValue } from '../form-value';
import { StepName } from '../../step-flow';
import { individualEntityInnValidator, phoneNumberValidator, urlValidator } from '../../../../../form-controls';
import { toFormValue } from './to-form-value';

@Injectable()
export class BasicInfoService extends QuestionaryFormService {
    constructor(
        protected fb: FormBuilder,
        protected questionaryStateService: QuestionaryStateService,
        protected validityService: ValidityService
    ) {
        super(questionaryStateService, validityService);
        this.form$.next(this.initForm());
        this.form$.complete();
    }

    protected toFormValue(d: QuestionaryData): FormValue {
        return toFormValue(d);
    }

    protected applyToQuestionaryData(d: QuestionaryData, v: FormValue): QuestionaryData {
        return applyToQuestionaryData(d, v);
    }

    protected getStepName(): StepName {
        return StepName.BasicInfo;
    }

    private initForm(): FormGroup {
        return this.fb.group({
            name: ['', Validators.required],
            inn: ['', [Validators.required, individualEntityInnValidator]],
            registrationPlace: ['', Validators.required],
            shopUrl: ['', [Validators.required, urlValidator]],
            shopName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phoneNumber: ['', [Validators.required, phoneNumberValidator]]
        });
    }
}
