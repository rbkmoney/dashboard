import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormArray, FormBuilder, FormGroup } from '@ngneat/reactive-forms';

import { QuestionaryData } from '@dsh/api-codegen/questionary';
import { getAbstractControl } from '@dsh/app/shared/utils';

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
    RussianDomesticPassportService,
} from '../subforms';
import { applyToQuestionaryData } from './apply-to-questionary-data';
import { toFormValue } from './to-form-value';

@Injectable()
export class BeneficialOwnersService extends QuestionaryFormService {
    private form: FormGroup;

    constructor(
        protected fb: FormBuilder,
        protected questionaryStateService: QuestionaryStateService,
        protected validityService: ValidityService,
        protected validationCheckService: ValidationCheckService,
        private privateEntityInfoService: PrivateEntityInfoService,
        private russianDomesticPassportService: RussianDomesticPassportService,
        private pdlInfoService: PdlInfoService,
        private individualResidencyInfoService: IndividualResidencyInfoService
    ) {
        super(questionaryStateService, validityService, validationCheckService);
    }

    clearOwners() {
        getAbstractControl<FormArray>(this.form, 'beneficialOwners').clear();
    }

    addOwner(ownerCount = 1) {
        for (let i = 0; i < ownerCount; i += 1) {
            getAbstractControl<FormArray>(this.form, 'beneficialOwners').push(this.constructBeneficialOwnerForm());
        }
    }

    removeOwner(index: number) {
        const beneficialOwners = this.form.controls.beneficialOwners as FormArray;
        beneficialOwners.removeAt(index);
        this.checkOwners();
    }

    protected applyToQuestionaryData(data: QuestionaryData, formValue: FormValue): QuestionaryData {
        return applyToQuestionaryData(data, formValue);
    }

    protected getStepName(): StepName {
        return StepName.BeneficialOwners;
    }

    protected toForm(data: QuestionaryData): FormGroup {
        const formValue = toFormValue(data);
        this.form = this.constructForm();
        this.checkOwners();
        this.form.patchValue(formValue);
        return this.form;
    }

    private checkOwners(): void {
        const ownersCount = getAbstractControl<FormArray>(this.form, 'beneficialOwners').length;

        if (ownersCount === 0) {
            this.addOwner(1);
        }
    }

    private constructForm(): FormGroup {
        return this.fb.group({
            noOwners: [false, Validators.required],
            beneficialOwners: this.fb.array([]),
        });
    }

    private constructBeneficialOwnerForm() {
        return this.fb.group({
            ownershipPercentage: [
                1,
                [Validators.required, Validators.min(1), Validators.max(100), Validators.pattern(/^\d+$/)],
            ],
            privateEntityInfo: this.privateEntityInfoService.getForm(),
            russianDomesticPassport: this.russianDomesticPassportService.getForm(),
            pdlInfo: this.pdlInfoService.getForm(),
            individualResidencyInfo: this.individualResidencyInfoService.getForm(),
        });
    }
}
