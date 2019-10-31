import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import get from 'lodash.get';
import isEmpty from 'lodash/isEmpty';

import { QuestionaryFormService } from '../questionary-form.service';
import { QuestionaryData, IdentityDocument } from '../../../../../api-codegen/questionary';
import { FormValue } from '../form-value';
import { StepName } from '../../step-flow';
import { QuestionaryStateService } from '../../questionary-state.service';
import { ValidityService } from '../../validity';
import { applyToQuestionaryData } from './apply-to-questionary-data';
import { RussianDomesticPassportService, PdlInfoService, AuthorityConfirmingDocumentService } from '../subforms';

@Injectable()
export class RussianLegalOwnerService extends QuestionaryFormService {
    constructor(
        protected questionaryStateService: QuestionaryStateService,
        protected validityService: ValidityService,
        private fb: FormBuilder,
        private russianDomesticPassportService: RussianDomesticPassportService,
        private pdlInfoService: PdlInfoService,
        private authorityConfirmingDocumentService: AuthorityConfirmingDocumentService
    ) {
        super(questionaryStateService, validityService);
        this.form$.next(this.initForm());
        this.form$.complete();
    }

    protected toFormValue(d: QuestionaryData): FormValue {
        const legalOwnerInfo = get(d, ['contractor', 'legalEntity', 'legalOwnerInfo']);
        const russianPrivateEntity = get(legalOwnerInfo, ['russianPrivateEntity']);
        return {
            birthDate: get(russianPrivateEntity, ['birthDate'], null),
            birthPlace: get(russianPrivateEntity, ['birthPlace'], null),
            residenceAddress: get(russianPrivateEntity, ['residenceAddress'], null),
            snils: get(legalOwnerInfo, ['snils'], null),
            headPosition: get(legalOwnerInfo, ['headPosition'], null),
            innfl: get(legalOwnerInfo, ['inn'], null),
            russianDomesticPassport: this.toDomesticPassportFormValue(get(legalOwnerInfo, ['identityDocument'])),
            pdlInfo: this.toPdlInfoFormValue(legalOwnerInfo),
            termOfOffice: get(legalOwnerInfo, ['termOfOffice'], null)
        };
    }

    protected applyToQuestionaryData(data: QuestionaryData, formValue: FormValue): QuestionaryData {
        return applyToQuestionaryData(data, formValue);
    }

    protected getStepName(): StepName {
        return StepName.RussianLegalOwner;
    }

    private toDomesticPassportFormValue(identityDocument: IdentityDocument): FormValue {
        return {
            seriesNumber: get(identityDocument, ['seriesNumber'], null),
            issuer: get(identityDocument, ['issuer'], null),
            issuerCode: get(identityDocument, ['issuerCode'], null),
            issuedAt: get(identityDocument, ['issuedAt'], null)
        };
    }

    private toPdlInfoFormValue(legalOwnerInfo): FormValue {
        const pdlRelationDegree = get(legalOwnerInfo, ['pdlRelationDegree'], null);
        if (!isEmpty(pdlRelationDegree)) {
            this.pdlInfoService.setPdlRelationDegreeVisible(true);
        }
        return {
            pdlCategory: get(legalOwnerInfo, ['pdlCategory'], false),
            pdlRelationDegree
        };
    }

    private initForm(): FormGroup {
        return this.fb.group({
            fio: ['', Validators.required],
            birthDate: ['', Validators.required],
            birthPlace: ['', Validators.required],
            residenceAddress: ['', Validators.required],
            snils: ['', Validators.required],
            headPosition: ['', Validators.required],
            innfl: [''],
            russianDomesticPassport: this.russianDomesticPassportService.getForm(),
            pdlInfo: this.pdlInfoService.getForm(),
            termOfOffice: ['', Validators.required],
            authorityConfirmingDocument: this.authorityConfirmingDocumentService.getForm()
        });
    }
}
