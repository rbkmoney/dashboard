import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { QuestionaryFormService } from '../questionary-form.service';
import { QuestionaryData } from '../../../../../api-codegen/questionary';
import { FormValue } from '../form-value';
import { StepName } from '../../step-flow';
import { QuestionaryStateService } from '../../questionary-state.service';
import { ValidityService } from '../../validity';
import {
    PrivateEntityInfoService,
    RussianDomesticPassportService,
    PdlInfoService,
    IndividualResidencyInfoService
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
        this.form = this.initForm();
        this.form$.next(this.form);
        this.form$.complete();
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
            (this.form.controls.beneficialOwners as FormArray).push(this.initBeneficialOwner());
        }
    }

    removeOwner(index: number) {
        const beneficialOwners = this.form.controls.beneficialOwners as FormArray;
        if (beneficialOwners.length > 1) {
            beneficialOwners.removeAt(index);
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

    private initForm(): FormGroup {
        return this.fb.group({
            noOwners: [false, Validators.required],
            beneficialOwners: this.fb.array([])
        });
    }

    private initBeneficialOwner() {
        return this.fb.group({
            ownershipPercentage: [
                1,
                [Validators.required, Validators.min(1), Validators.max(100), Validators.pattern(/^\d+$/)]
            ],
            privateEntityInfo: this.privateEntityInfoService.getForm(),
            russianDomesticPassport: this.russianDomesticPassportService.getForm(),
            pdlInfo: this.pdlInfoService.getForm(),
            individualResidencyInfo: this.individualResidencyInfoService.getForm()
        });
    }
}
