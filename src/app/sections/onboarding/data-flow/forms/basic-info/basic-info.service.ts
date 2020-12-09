import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { QuestionaryData } from '@dsh/api-codegen/questionary';
import { individualOrLegalEntityInnValidator, phoneNumberValidator } from '@dsh/components/form-controls';

import { QuestionaryStateService } from '../../questionary-state.service';
import { StepName } from '../../step-flow';
import { ValidationCheckService } from '../../validation-check';
import { ValidityService } from '../../validity';
import { FormValue } from '../form-value';
import { QuestionaryFormService } from '../questionary-form.service';
import { applyToQuestionaryData } from './apply-to-questionary-data';
import { toFormValue } from './to-form-value';

@Injectable()
export class BasicInfoService extends QuestionaryFormService {
    private form: FormGroup;

    constructor(
        protected fb: FormBuilder,
        protected questionaryStateService: QuestionaryStateService,
        protected validityService: ValidityService,
        protected validationCheckService: ValidationCheckService
    ) {
        super(questionaryStateService, validityService, validationCheckService);
    }

    patchForm(value: { [key: string]: any }) {
        this.form.patchValue(value);
    }

    protected toForm(data: QuestionaryData): FormGroup {
        this.form = this.constructForm();
        this.form.patchValue(toFormValue(data));
        return this.form;
    }

    protected applyToQuestionaryData(d: QuestionaryData, v: FormValue): QuestionaryData {
        return applyToQuestionaryData(d, v);
    }

    protected getStepName(): StepName {
        return StepName.BasicInfo;
    }

    private constructForm(): FormGroup {
        return this.fb.group({
            name: ['', Validators.required],
            inn: ['', [Validators.required, individualOrLegalEntityInnValidator]],
            registrationPlace: ['', Validators.required],
            shopUrl: ['', Validators.required],
            shopName: ['', Validators.required],
            email: ['', Validators.required],
            phoneNumber: ['', [Validators.required, phoneNumberValidator]],
        });
    }
}
