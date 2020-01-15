import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { QuestionaryFormService } from '../questionary-form.service';
import { QuestionaryStateService } from '../../questionary-state.service';
import { ValidityService } from '../../validity';
import { QuestionaryData, MonthOperationSum, MonthOperationCount } from '../../../../../api-codegen/questionary';
import { FormValue } from '../form-value';
import { StepName } from '../../step-flow';
import { applyToQuestionaryData } from './apply-to-questionary-data';
import { toFormValue } from './to-form-value';
import { bikValidator, bankPostAccountValidator, bankAccountValidator } from '../../../../../form-controls';

@Injectable()
export class PlanningOperationsAndPayoutToolService extends QuestionaryFormService {
    private form: FormGroup;

    constructor(
        protected fb: FormBuilder,
        protected questionaryStateService: QuestionaryStateService,
        protected validityService: ValidityService
    ) {
        super(questionaryStateService, validityService);
    }

    readonly monthOperationCounts: MonthOperationCount[] = ['LtTen', 'BtwTenToFifty', 'GtFifty'];

    readonly monthOperationSums: MonthOperationSum[] = [
        'LtFiveHundredThousand',
        'BtwFiveHundredThousandToOneMillion',
        'GtOneMillion'
    ];

    patchBankAccountForm(value: { [key: string]: any }) {
        this.form.get('bankAccount').patchValue(value);
    }

    protected toForm(data: QuestionaryData): FormGroup {
        this.form = this.constructForm();
        this.form.patchValue(toFormValue(data));
        return this.form;
    }

    protected applyToQuestionaryData(data: QuestionaryData, formValue: FormValue): QuestionaryData {
        return applyToQuestionaryData(data, formValue);
    }

    protected getStepName(): StepName {
        return StepName.PlanningOperationsAndPayoutTool;
    }

    private constructForm(): FormGroup {
        return this.fb.group({
            monthOperationCount: ['', Validators.required],
            monthOperationSum: ['', Validators.required],
            bankAccount: this.fb.group({
                account: ['', [Validators.required, bankAccountValidator]],
                bankName: ['', Validators.required],
                bankPostAccount: ['', [Validators.required, bankPostAccountValidator]],
                bankBik: ['', [Validators.required, bikValidator]]
            })
        });
    }
}
