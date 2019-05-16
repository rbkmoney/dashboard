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
            type: ['', Validators.required]
        });
        this.form.controls.suggestions.valueChanges.subscribe(() => {
            delete this.suggestion;
            this.form.controls.type.setValue(undefined);
        });
    }
}
