import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { QuestionaryData } from '../../../../../api-codegen/questionary';
import { QuestionaryStateService } from '../../questionary-state.service';
import { StepName } from '../../step-flow';
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
    private beneficialOwnersVisible$ = new BehaviorSubject(true);

    constructor(
        protected fb: FormBuilder,
        protected questionaryStateService: QuestionaryStateService,
        protected validityService: ValidityService,
        private privateEntityInfoService: PrivateEntityInfoService,
        private russianDomesticPassportService: RussianDomesticPassportService,
        private pdlInfoService: PdlInfoService,
        private individualResidencyInfoService: IndividualResidencyInfoService
    ) {
        super(questionaryStateService, validityService);
    }

    isBeneficialOwnersVisible$ = this.beneficialOwnersVisible$.asObservable();

    noOwnersChange(noOwners: boolean, ownerCount = 1) {
        this.beneficialOwnersVisible$.next(!noOwners);
        noOwners ? this.clearOwners() : this.addOwner(ownerCount);
    }

    clearOwners() {
        (this.form.controls.beneficialOwners as FormArray).clear();
    }

    addOwner(ownerCount = 1) {
        for (let i = 0; i < ownerCount; i++) {
            (this.form.controls.beneficialOwners as FormArray).push(this.constructBeneficialOwnerForm());
        }
    }

    removeOwner(index: number) {
        const beneficialOwners = this.form.controls.beneficialOwners as FormArray;
        beneficialOwners.removeAt(index);
        if (beneficialOwners.length === 0) {
            this.noOwnersChange(true);
        }
    }

    protected toFormValue(data: QuestionaryData): FormValue {
        const formValue = toFormValue(data);
        const ownersCount = formValue.beneficialOwners.length;
        this.noOwnersChange(ownersCount === 0, ownersCount);
        return formValue;
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
        const ownersCount = formValue.beneficialOwners.length;
        this.noOwnersChange(ownersCount === 0, ownersCount);
        this.form.patchValue(formValue);
        return this.form;
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
