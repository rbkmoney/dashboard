import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SuggestionData } from '../../dadata/model/suggestions';
import { SuggestionType } from '../../dadata/model/type';

@Injectable()
export class OnboardingService {
    form: FormGroup;
    suggestion: SuggestionData<SuggestionType.party>;

    constructor(fb: FormBuilder) {
        this.form = fb.group({
            suggestions: [''],
            type: ['', Validators.required],
            legalEntity: fb.group({
                russianName: ['', Validators.required],
                internationalName: [''],
                inn: ['', Validators.required],
                ogrn: ['', Validators.required],
                registrationDate: ['', Validators.required],
                legalForm: ['', Validators.required],
                registrationAddress: ['', Validators.required],
                actualAddress: ['', Validators.required],
                additionalSpace: ['', Validators.required],
                okatoCode: [''],
                okpoCode: [''],
                propertyInfo: ['', Validators.required]
            })
        });
        this.form.controls.suggestions.valueChanges.subscribe(() => {
            delete this.suggestion;
            this.form.controls.type.setValue(undefined);
        });
    }
}
