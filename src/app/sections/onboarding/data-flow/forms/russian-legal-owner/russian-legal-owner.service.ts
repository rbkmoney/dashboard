import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { QuestionaryData } from '../../../../../api-codegen/questionary';
import { QuestionaryStateService } from '../../questionary-state.service';
import { StepName } from '../../step-flow';
import { ValidationCheckService } from '../../validation-check';
import { ValidityService } from '../../validity';
import { FormValue } from '../form-value';
import { QuestionaryFormService } from '../questionary-form.service';
import {
    AuthorityConfirmingDocumentService,
    PdlInfoService,
    PrivateEntityInfoService,
    RussianDomesticPassportService,
} from '../subforms';
import { applyToQuestionaryData } from './apply-to-questionary-data';
import { toFormValue } from './to-form-value';

@Injectable()
export class RussianLegalOwnerService extends QuestionaryFormService {
    constructor(
        protected questionaryStateService: QuestionaryStateService,
        protected validityService: ValidityService,
        protected validationCheckService: ValidationCheckService,
        private fb: FormBuilder,
        private russianDomesticPassportService: RussianDomesticPassportService,
        private pdlInfoService: PdlInfoService,
        private authorityConfirmingDocumentService: AuthorityConfirmingDocumentService,
        private privateEntityInfoService: PrivateEntityInfoService
    ) {
        super(questionaryStateService, validityService, validationCheckService);
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
        return StepName.RussianLegalOwner;
    }

    private constructForm(): FormGroup {
        return this.fb.group({
            privateEntityInfo: this.privateEntityInfoService.getForm(),
            headPosition: ['', Validators.required],
            termOfOffice: ['', Validators.required],
            russianDomesticPassport: this.russianDomesticPassportService.getForm(),
            pdlInfo: this.pdlInfoService.getForm(),
            authorityConfirmingDocument: this.authorityConfirmingDocumentService.getForm(),
        });
    }
}
