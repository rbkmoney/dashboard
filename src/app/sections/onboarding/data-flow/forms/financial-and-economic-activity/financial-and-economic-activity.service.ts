import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import get from 'lodash.get';

import { QuestionaryFormService } from '../questionary-form.service';
import { QuestionaryStateService } from '../../questionary-state.service';
import { ValidityService } from '../../validity';
import { QuestionaryData, WithoutChiefAccountant } from '../../../../../api-codegen/questionary';
import { FormValue } from '../form-value';
import { StepName } from '../../step-flow';
import { applyToQuestionaryData } from './apply-to-questionary-data';
import { toFormValue } from './to-form-value';
import { LegalResidencyInfoService } from '../subforms';

type WithoutChiefAccountantType = WithoutChiefAccountant.WithoutChiefAccountantTypeEnum;

const accountantTypes: WithoutChiefAccountantType[] = [
    'HeadAccounting',
    'IndividualAccountant',
    'AccountingOrganization'
];

@Injectable()
export class FinancialAndEconomicActivityService extends QuestionaryFormService {
    private accountantInfoVisible$ = new BehaviorSubject(false);
    private accountantOrgInnVisible$ = new BehaviorSubject(false);
    private residencyInfoVisible$ = new BehaviorSubject(false);

    private form: FormGroup;

    readonly accountantOptionTypes = accountantTypes;
    isAccountantInfoVisible$ = this.accountantInfoVisible$.asObservable();
    isAccountantOrgInnVisible$ = this.accountantOrgInnVisible$.asObservable();
    isResidencyInfoVisible$ = this.residencyInfoVisible$.asObservable();

    constructor(
        protected fb: FormBuilder,
        protected questionaryStateService: QuestionaryStateService,
        protected validityService: ValidityService,
        private legalResidencyInfoService: LegalResidencyInfoService
    ) {
        super(questionaryStateService, validityService);
        this.form = this.initForm();
        this.form$.next(this.form);
        this.form$.complete();
    }

    withoutAccountantChange(withoutAccountant: boolean) {
        this.accountantInfoVisible$.next(withoutAccountant);
        this.accountantOrgInnVisible$.next(false);
        this.form.setControl('accountantType', this.fb.control('', withoutAccountant ? Validators.required : null));
    }

    accountantTypeChange(accountantOptionType: WithoutChiefAccountantType) {
        const isAccountingOrganization = accountantOptionType === 'AccountingOrganization';
        this.accountantOrgInnVisible$.next(isAccountingOrganization);
        this.form.setControl(
            'accountantOrgInn',
            this.fb.control('', isAccountingOrganization ? Validators.required : null)
        );
    }

    protected toFormValue(data: QuestionaryData): FormValue {
        const formValue = toFormValue(data);
        this.withoutAccountantChange(formValue.withoutAccountant);
        this.accountantTypeChange(formValue.accountantType);
        this.residencyInfoChange(data);
        return formValue;
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

    private initForm(): FormGroup {
        return this.fb.group({
            staffCount: ['', [Validators.required, Validators.minLength(1), Validators.pattern(/^\d+$/)]],
            withoutAccountant: [false, Validators.required],
            accountantType: [''],
            accountantOrgInn: [''],
            hasBeneficiaryParty: [false, Validators.required],
            hasLiquidationProcess: [false, Validators.required],
            residencyInfo: this.legalResidencyInfoService.getForm()
        });
    }
}
