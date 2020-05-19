import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { QuestionaryData } from '../../../../../api-codegen/questionary/swagger-codegen';
import { QuestionaryStateService } from '../../questionary-state.service';
import { StepName } from '../../step-flow';
import { ValidationCheckService } from '../../validation-check';
import { ValidityService } from '../../validity';
import { FormValue } from '../form-value';
import { QuestionaryFormService } from '../questionary-form.service';
import {
    IndividualResidencyInfoService,
    PdlInfoService,
    PrivateEntityInfoService,
    RussianDomesticPassportService
} from '../subforms';
import { applyToQuestionaryData } from './apply-to-questionary-data';
import { toFormValue } from './to-form-value';

@Injectable()
export class RussianPrivateEntityService extends QuestionaryFormService {
    constructor(
        protected questionaryStateService: QuestionaryStateService,
        protected validityService: ValidityService,
        protected validationCheckService: ValidationCheckService,
        private fb: FormBuilder,
        private privateEntityInfoService: PrivateEntityInfoService,
        private russianDomesticPassportService: RussianDomesticPassportService,
        private pdlInfoService: PdlInfoService,
        private individualResidencyInfoService: IndividualResidencyInfoService
    ) {
        super(questionaryStateService, validityService, validationCheckService);
    }

    protected toFormValue(d: QuestionaryData): FormValue {
        return toFormValue(d);
    }

    protected toForm(data: QuestionaryData): FormGroup {
        const form = this.constructForm();
        form.patchValue(toFormValue(data));
        return form;
    }

    protected applyToQuestionaryData(data: QuestionaryData, formValue: FormValue): QuestionaryData {
        return applyToQuestionaryData(data, formValue);
    }

    protected getStepName(): StepName {
        return StepName.RussianPrivateEntity;
    }

    private constructForm(): FormGroup {
        return this.fb.group({
            privateEntityInfo: this.privateEntityInfoService.getForm(),
            russianDomesticPassport: this.russianDomesticPassportService.getForm(),
            pdlInfo: this.pdlInfoService.getForm(),
            individualResidencyInfo: this.individualResidencyInfoService.getForm()
        });
    }
}
