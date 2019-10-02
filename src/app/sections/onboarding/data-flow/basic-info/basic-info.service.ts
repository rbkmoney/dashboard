import { Injectable } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { QuestionaryService } from '../questionary.service';
import { ValidityService } from '../validity.service';
import { QuestionaryData } from '../../../../api-codegen/questionary';
import { QuestionaryFormService } from '../questionary-form.service';

const toBasicInfo = (
    data: QuestionaryData
): {
    [key: string]: any;
} => {
    console.log(data);
    return {};
};

const basicInfoFormValToQuestionaryData = (val: { [key: string]: any }): QuestionaryData => {
    console.log(val);
    return {};
};

@Injectable()
export class BasicInfoService extends QuestionaryFormService {
    constructor(
        protected fb: FormBuilder,
        protected questionaryService: QuestionaryService,
        protected validityService: ValidityService
    ) {
        super(fb, questionaryService, validityService);
    }

    protected getForm(): FormGroup {
        return this.fb.group({
            name: ['', Validators.required],
            inn: ['', Validators.required],
            registrationPlace: ['', Validators.required],
            shopUrl: ['', Validators.required],
            shopName: ['', Validators.required],
            email: ['', Validators.required],
            phoneNumber: ['', Validators.required]
        });
    }

    protected toFormValue(data: QuestionaryData): { [key: string]: any } {
        return toBasicInfo(data);
    }

    protected toQuestionaryData(formValue: { [key: string]: any }): QuestionaryData {
        return basicInfoFormValToQuestionaryData(formValue);
    }
}
