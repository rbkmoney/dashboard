import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { QuestionaryFormService } from '../questionary-form.service';
import { QuestionaryStateService } from '../../questionary-state.service';
import { ValidityService } from '../../validity';
import { PrivateEntityInfoService } from '../subforms/private-entity-info';
import { StepName } from '../../step-flow';
import { QuestionaryData } from '../../../../../api-codegen/questionary/swagger-codegen';
import { FormValue } from '../form-value';
import { toFormValue } from './to-form-value';
import { applyToQuestionaryData } from './apply-to-questionary-data';
import { RussianDomesticPassportService } from '../subforms/russian-domestic-passport';
import { PdlInfoService } from '../subforms/pdl-info';

@Injectable()
export class RussianPrivateEntityService extends QuestionaryFormService {
    constructor(
        protected questionaryStateService: QuestionaryStateService,
        protected validityService: ValidityService,
        private fb: FormBuilder,
        private privateEntityInfoService: PrivateEntityInfoService,
        private russianDomesticPassportService: RussianDomesticPassportService,
        private pdlInfoService: PdlInfoService
    ) {
        super(questionaryStateService, validityService);
        this.form$.next(this.initForm());
        this.form$.complete();
    }

    protected toFormValue(d: QuestionaryData): FormValue {
        return toFormValue(d);
    }

    protected applyToQuestionaryData(data: QuestionaryData, formValue: FormValue): QuestionaryData {
        return applyToQuestionaryData(data, formValue);
    }

    protected getStepName(): StepName {
        return StepName.RussianPrivateEntity;
    }

    private initForm(): FormGroup {
        return this.fb.group({
            russianPrivateEntity: this.privateEntityInfoService.getForm(),
            russianDomesticPassport: this.russianDomesticPassportService.getForm(),
            pdlInfo: this.pdlInfoService.getForm()
        });
    }
}
