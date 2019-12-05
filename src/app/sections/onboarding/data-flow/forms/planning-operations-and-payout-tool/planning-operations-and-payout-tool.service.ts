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

@Injectable()
export class PlanningOperationsAndPayoutToolService extends QuestionaryFormService {
    form: FormGroup;

    constructor(
        protected fb: FormBuilder,
        protected questionaryStateService: QuestionaryStateService,
        protected validityService: ValidityService
    ) {
        super(questionaryStateService, validityService);
        this.form = this.initForm();
        this.form$.next(this.form);
        this.form$.complete();
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

    protected toFormValue(data: QuestionaryData): FormValue {
        return toFormValue(data);
    }
    protected applyToQuestionaryData(data: QuestionaryData, formValue: FormValue): QuestionaryData {
        return applyToQuestionaryData(data, formValue);
    }
    protected getStepName(): StepName {
        return StepName.PlanningOperationsAndPayoutTool;
    }

    private initForm(): FormGroup {
        return this.fb.group({
            monthOperationCount: ['', Validators.required],
            monthOperationSum: ['', Validators.required],
            bankAccount: this.fb.group({
                account: ['', Validators.required],
                bankName: ['', Validators.required],
                bankPostAccount: ['', Validators.required],
                bankBik: ['', Validators.required]
            })
        });
    }
}
