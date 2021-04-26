import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import get from 'lodash-es/get';
import { BehaviorSubject } from 'rxjs';

import { AccountantInfo, QuestionaryData } from '@dsh/api-codegen/questionary';
import { legalEntityInnValidator } from '@dsh/components/form-controls';

import { QuestionaryStateService } from '../../questionary-state.service';
import { StepName } from '../../step-flow';
import { ValidationCheckService } from '../../validation-check';
import { ValidityService } from '../../validity';
import { FormValue } from '../form-value';
import { QuestionaryFormService } from '../questionary-form.service';
import { LegalResidencyInfoService } from '../subforms';
import { applyToQuestionaryData } from './apply-to-questionary-data';
import { toFormValue } from './to-form-value';

type AccountantInfoType = AccountantInfo.AccountantInfoTypeEnum;

const ACCOUNTANT_TYPES: AccountantInfoType[] = [
    'WithoutChiefHeadAccounting',
    'WithoutChiefIndividualAccountant',
    'WithoutChiefAccountingOrganization',
];

@Injectable()
export class FinancialAndEconomicActivityService extends QuestionaryFormService {
    private accountantInfoVisible$ = new BehaviorSubject(false);
    private accountantOrgInnVisible$ = new BehaviorSubject(false);
    private residencyInfoVisible$ = new BehaviorSubject(false);

    private form: FormGroup;

    // eslint-disable-next-line @typescript-eslint/member-ordering
    readonly accountantOptionTypes = ACCOUNTANT_TYPES;
    // eslint-disable-next-line @typescript-eslint/member-ordering
    isAccountantInfoVisible$ = this.accountantInfoVisible$.asObservable();
    // eslint-disable-next-line @typescript-eslint/member-ordering
    isAccountantOrgInnVisible$ = this.accountantOrgInnVisible$.asObservable();
    // eslint-disable-next-line @typescript-eslint/member-ordering
    isResidencyInfoVisible$ = this.residencyInfoVisible$.asObservable();

    constructor(
        protected fb: FormBuilder,
        protected questionaryStateService: QuestionaryStateService,
        protected validityService: ValidityService,
        protected validationCheckService: ValidationCheckService,
        private legalResidencyInfoService: LegalResidencyInfoService
    ) {
        super(questionaryStateService, validityService, validationCheckService);
    }

    withoutAccountantChange(withoutAccountant: boolean) {
        this.accountantInfoVisible$.next(withoutAccountant);
        this.accountantOrgInnVisible$.next(false);
        this.form.setControl('accountantType', this.fb.control('', withoutAccountant ? Validators.required : null));
    }

    accountantTypeChange(accountantOptionType: AccountantInfoType) {
        const isAccountingOrganization = accountantOptionType === 'WithoutChiefAccountingOrganization';
        this.accountantOrgInnVisible$.next(isAccountingOrganization);
        this.form.setControl(
            'accountantOrgInn',
            this.fb.control('', isAccountingOrganization ? [Validators.required, legalEntityInnValidator] : null)
        );
    }

    protected toForm(data: QuestionaryData): FormGroup {
        const formValue = toFormValue(data);
        this.form = this.constructForm();
        this.withoutAccountantChange(formValue.withoutAccountant);
        this.accountantTypeChange(formValue.accountantType);
        this.residencyInfoChange(data);
        this.form.patchValue(formValue);
        return this.form;
    }

    protected applyToQuestionaryData(data: QuestionaryData, formValue: FormValue): QuestionaryData {
        return applyToQuestionaryData(data, formValue);
    }

    protected getStepName(): StepName {
        return StepName.FinancialAndEconomicActivity;
    }

    private residencyInfoChange(data: QuestionaryData) {
        const contractorType = get(data, ['contractor', 'contractorType']);
        switch (contractorType) {
            case 'IndividualEntityContractor':
                this.residencyInfoVisible$.next(false);
                this.form.removeControl('residencyInfo');
                break;
            case 'LegalEntityContractor':
                this.residencyInfoVisible$.next(true);
                break;
        }
    }

    private constructForm(): FormGroup {
        return this.fb.group({
            staffCount: ['1', [Validators.required, Validators.minLength(1), Validators.pattern(/^\d+$/)]],
            withoutAccountant: [false, Validators.required],
            accountantType: ['WithChiefAccountant'],
            accountantOrgInn: [''],
            hasBeneficiary: [false, Validators.required],
            hasLiquidationProcess: [false, Validators.required],
            residencyInfo: this.legalResidencyInfoService.getForm(),
        });
    }
}
