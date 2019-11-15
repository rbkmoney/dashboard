import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

import { QuestionaryFormService } from '../questionary-form.service';
import { QuestionaryData } from '../../../../../api-codegen/questionary';
import { FormValue } from '../form-value';
import { StepName } from '../../step-flow';
import { QuestionaryStateService } from '../../questionary-state.service';
import { ValidityService } from '../../validity';
import { applyToQuestionaryData } from './apply-to-questionary-data';
import {
    RussianDomesticPassportService,
    PdlInfoService,
    AuthorityConfirmingDocumentService,
    PrivateEntityInfoService
} from '../subforms';
import { toFormValue } from './to-form-value';

@Injectable()
export class RussianLegalOwnerService extends QuestionaryFormService {
    constructor(
        protected questionaryStateService: QuestionaryStateService,
        protected validityService: ValidityService,
        private fb: FormBuilder,
        private russianDomesticPassportService: RussianDomesticPassportService,
        private pdlInfoService: PdlInfoService,
        private authorityConfirmingDocumentService: AuthorityConfirmingDocumentService,
        private privateEntityInfoService: PrivateEntityInfoService
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
        return StepName.RussianLegalOwner;
    }

    private initForm(): FormGroup {
        return this.fb.group({
            privateEntityInfo: this.privateEntityInfoService.getForm(),
            headPosition: ['', Validators.required],
            termOfOffice: ['', Validators.required],
            russianDomesticPassport: this.russianDomesticPassportService.getForm(),
            pdlInfo: this.pdlInfoService.getForm(),
            authorityConfirmingDocument: this.authorityConfirmingDocumentService.getForm()
        });
    }
}
