import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { QuestionaryFormService } from '../questionary-form.service';
import { QuestionaryStateService } from '../../questionary-state.service';
import { ValidityService } from '../../validity';
import { StepName } from '../../step-flow';
import { QuestionaryData } from '../../../../../api-codegen/questionary/swagger-codegen';
import { FormValue } from '../form-value';
import { toFormValue } from './to-form-value';
import { applyToQuestionaryData } from './apply-to-questionary-data';
import {
    PdlInfoService,
    RussianDomesticPassportService,
    IndividualResidencyInfoService,
    PrivateEntityInfoService
} from '../subforms';

@Injectable()
export class RussianPrivateEntityService extends QuestionaryFormService {
    constructor(
        protected questionaryStateService: QuestionaryStateService,
        protected validityService: ValidityService,
        private fb: FormBuilder,
        private privateEntityInfoService: PrivateEntityInfoService,
        private russianDomesticPassportService: RussianDomesticPassportService,
        private pdlInfoService: PdlInfoService,
        private individualResidencyInfoService: IndividualResidencyInfoService
    ) {
        super(questionaryStateService, validityService);
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
