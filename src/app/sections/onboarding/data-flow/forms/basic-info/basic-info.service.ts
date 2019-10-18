import { Injectable } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import get from 'lodash.get';

import { QuestionaryStateService } from '../../questionary-state.service';
import { ValidityService } from '../../validity.service';
import { QuestionaryData } from '../../../../../api-codegen/questionary';
import { QuestionaryFormService } from '../questionary-form.service';
import { applyToQuestionaryData } from './apply-to-questionary-data';
import { FormValue } from '../form-value';

@Injectable()
export class BasicInfoService extends QuestionaryFormService {
    constructor(
        protected fb: FormBuilder,
        protected questionaryStateService: QuestionaryStateService,
        protected validityService: ValidityService
    ) {
        super(fb, questionaryStateService, validityService);
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

    protected toFormValue(d: QuestionaryData): FormValue {
        const legalEntity = get(d, ['contractor', 'legalEntity']);
        return {
            name: get(legalEntity, ['name'], null),
            inn: get(legalEntity, ['inn'], null),
            registrationPlace: get(legalEntity, ['registrationInfo', 'registrationAddress'], null),
            shopUrl: get(d, ['shopInfo', 'location', 'url'], null),
            shopName: get(d, ['shopInfo', 'details', 'name'], null),
            email: get(d, ['contactInfo', 'email'], null),
            phoneNumber: get(d, ['contactInfo', 'phoneNumber'], null)
        };
    }

    protected applyToQuestionaryData(d: QuestionaryData, v: FormValue): QuestionaryData {
        return applyToQuestionaryData(d, v);
    }
}
