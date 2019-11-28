import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { QuestionaryFormService } from '../questionary-form.service';
import { QuestionaryData } from '../../../../../api-codegen/questionary';
import { FormValue } from '../form-value';
import { StepName } from '../../step-flow';
import { QuestionaryStateService } from '../../questionary-state.service';
import { ValidityService } from '../../validity';
import { PrivateEntityInfoService, RussianDomesticPassportService, PdlInfoService } from '../subforms';
import { applyToQuestionaryData } from './apply-to-questionary-data';
import { toFormValue } from './to-form-value';
import { IndividualResidencyInfoService } from '../subforms/individual-residency-info';

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

    noOwnersChange(noOwners: boolean) {
        this.beneficialOwnersVisible$.next(!noOwners);
        noOwners ? this.clearOwners() : this.addOwner();
    }

    clearOwners() {
        (this.form.controls.beneficialOwners as FormArray).clear();
    }

    addOwner() {
        (this.form.controls.beneficialOwners as FormArray).push(this.initBeneficialOwner());
    }

    removeOwner(index: number) {
        const beneficialOwners = this.form.controls.beneficialOwners as FormArray;
        if (beneficialOwners.length > 1) {
            beneficialOwners.removeAt(index);
        }
    }

    protected toFormValue(data: QuestionaryData): FormValue {
        const formValue = toFormValue(data);
        this.form = this.initForm(formValue.beneficialOwners.length);
        this.noOwnersChange(formValue.noOwners);
        this.form$.next(this.form);
        this.form$.complete();
        return formValue;
    }

    protected applyToQuestionaryData(data: QuestionaryData, formValue: FormValue): QuestionaryData {
        return applyToQuestionaryData(data, formValue);
    }

    protected getStepName(): StepName {
        return StepName.BeneficialOwners;
    }

    private initForm(ownersCount: number): FormGroup {
        const minOwners = 1;
        return this.fb.group({
            noOwners: [false, Validators.required],
            beneficialOwners: this.fb.array(
                new Array(ownersCount === 0 ? minOwners : ownersCount).fill(null).map(() => this.initBeneficialOwner())
            )
        });
    }

    private initBeneficialOwner() {
        return this.fb.group({
            ownershipPercentage: ['', [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]],
            privateEntityInfo: this.privateEntityInfoService.getForm(),
            russianDomesticPassport: this.russianDomesticPassportService.getForm(),
            pdlInfo: this.pdlInfoService.getForm(),
            individualResidencyInfo: this.individualResidencyInfoService.getForm()
        });
    }
}
